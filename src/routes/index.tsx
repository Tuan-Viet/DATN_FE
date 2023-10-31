import routes from "../config/routes";
import Banner from "../layout/Banner";
import categoryAdd from "../pages/admin/categoryAdd";
import categoryPage from "../pages/admin/categoryPage";
import categoryUpdate from "../pages/admin/categoryUpdate";
import dashboardPage from "../pages/admin/dashboard";
import productAdd from "../pages/admin/productAdd";
import productPage from "../pages/admin/productPage/index.";
import productUpdate from "../pages/admin/productUpdate";
import userPage from "../pages/admin/userPage";
import userUpdate from "../pages/admin/userUpdate";
import About from "../pages/client/About";
import BillConfirm from "../pages/client/BillConfirm";
import CheckoutsPage from "../pages/client/Checkouts";
import cartPage from "../pages/client/cart";
import homePage from "../pages/client/homePage";
import productDetail from "../pages/client/productDetail";
import signin from "../pages/client/signin";
import signup from "../pages/client/signup";

export const publicRoutes = [
    { path: routes.home, Component: homePage },
    { path: routes.banner, Component: Banner },
    { path: routes.about, Component: About },
    { path: routes.productDetail, Component: productDetail },
    { path: routes.cart, Component: cartPage },
    { path: routes.checkout, Component: CheckoutsPage },
    { path: routes.Billconfirm, Component: BillConfirm },
    { path: routes.signin, Component: signin },
    { path: routes.signup, Component: signup },
]

export const privateRoutes = [
    { path: routes.admin, Component: dashboardPage },
    { path: routes.adminDashboard, Component: dashboardPage },
    { path: routes.adminProducts, Component: productPage },
    { path: routes.adminProductAdd, Component: productAdd },
    { path: routes.adminProductUpdate, Component: productUpdate },
    { path: routes.adminCategorys, Component: categoryPage },
    { path: routes.adminCategoryAdd, Component: categoryAdd },
    { path: routes.adminCategoryUpdate, Component: categoryUpdate },
    { path: routes.adminUsers, Component: userPage },
    { path: routes.adminUserUpdate, Component: userUpdate },
]