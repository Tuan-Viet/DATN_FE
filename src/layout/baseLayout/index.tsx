import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

type Props = {
    children: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
    return <div>
        {children}
    </div>;
};

export default BaseLayout;