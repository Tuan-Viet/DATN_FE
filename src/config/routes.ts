const routes = {
    //Client
    home: "/",
    banner: "/",
    about: "/about",
    contact: "/contact",
    products: "/collections/:id?",
    productDetail: "/products/:id",
    cart: "/cart",
    checkout: "/checkout",
    Billconfirm: "/orders/:id",
    signin: "/signin",
    signup: "/signup",
    myAccount: "/account",
    orders: "/account/orders",
    addresses: "/account/addresses",
    orderDetail: "/account/orders/:id",

    // Admin 
    admin: "/admin",
    adminDashboard: "/admin/dashboard",
    adminProducts: "/admin/product",
    adminProductAdd: "/admin/product/add",
    adminProductUpdate: "/admin/product/update/:id",
    adminCategorys: "/admin/category",
    adminCategoryAdd: "/admin/category/add",
    adminCategoryUpdate: "/admin/category/update/:id",
    adminUsers: "/admin/user",
    adminUserUpdate: "/admin/user/update/:id",
    adminOrdersPage: "/admin/order",
    adminOrderUpdate: "/admin/order/:id",
    adminVoucherPage: "/admin/voucher",
    adminVoucherAdd: "/admin/voucher/add",
    adminVoucherUpdate: "/admin/voucher/update/:id",
}

export default routes;