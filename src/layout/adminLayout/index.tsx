import React, { Dispatch, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
type Props = { children: React.ReactNode };

import {
  PieChartOutlined,
  CodeSandboxOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
  UserOutlined,
  TagOutlined,
  SolutionOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, message, theme } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/user/userSlice";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={"/admin/dashboard"}>Dashboard</Link >, '1', <PieChartOutlined />),
  getItem('Sản phẩm', 'sub1', <CodeSandboxOutlined />, [
    getItem(<Link to={"/admin/product/add"}>Tạo mới sản phẩm</Link >, '3'),
    getItem(<Link to={"/admin/product"}>Quản lý sản phẩm</Link >, '4'),
  ]),
  getItem('Danh mục', 'sub2', <AppstoreAddOutlined />, [
    getItem(<Link to={"/admin/category/add"}>Tạo mới danh mục</Link >, '5'),
    getItem(<Link to={"/admin/category"}>Quản lý danh mục</Link >, '6'),
  ]),
  getItem(<Link to={"/admin/user"}>Quản lý người dùng</Link >, '7', <UserOutlined />),
  getItem(<Link to={"/admin/order"}>Đơn hàng</Link >, '8', <SolutionOutlined />),
  getItem('Khuyến mại', 'sub3', <TagOutlined />, [
    // getItem(<Link to={"/admin/voucher"}>Quản lý khuyến mại</Link >, '9'),
    getItem(<Link to={"/admin/voucher"}>Quản lý Voucher</Link >, '10'),
  ]),
  getItem('Thống kê', 'sub4', <BarChartOutlined />, [
    getItem(<Link to={"/admin/statistic"}>Báo cáo bán hàng</Link >, '9'),
    // getItem(<Link to={"/admin/statistic/product"}>Thống kê theo sản phẩm</Link >, '10'),
    // getItem(<Link to={"/admin/statistic/order"}>Thống kê theo quý</Link >, '11'),

  ]),
];

const AdminLayout = ({ children }: Props) => {
  const dispatch: Dispatch<any> = useDispatch()

  const user = useSelector((state: any) => state.user);
  const role = user?.current?.role
  const navigate = useNavigate();
  useEffect(() => {
    if (role != "admin") {
      return navigate("/");
    }
  }, [navigate, role]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logOut = () => {
    // Gọi action đăng xuất
    dispatch(logout());
    message.info("Đăng xuất thành công");
    localStorage.removeItem("carts")
    navigate("/signin");
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
        <div className="fixed bottom-0">
          <button className="text-gray-300 bg-gray-800 w-[200px] py-3 hover:text-white" onClick={() => logOut()}>
            <LogoutOutlined className="mr-2" />
            Đăng xuất
          </button>
        </div>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content className="">
          <div className="bg-slate-50" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
