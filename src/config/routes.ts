const routes = {
    //Client
    home: "/",
    banner: "/",
    about: "/about",
    contact: "/contact",
    products: "/collections/:id?",
    productDetail: "/products/:id",
    cart: "/cart",
    resetPassword: "/resetPassword",
    checkout: "/checkout",
    Billconfirm: "/orders/:id",
    signin: "/signin",
    signup: "/signup",
    myAccount: "/account",
    orders: "/account/orders",
    ordersReturn: "/account/ordersReturn",
    ordersReturnDetail: "/account/orderReturn/:id",
    changePassword: "/account/password",
    addresses: "/account/addresses",
    orderDetail: "/account/orders/:id",
    searchResult: "/search",
    outfit: "/outfit",

    // Admin 
    admin: "/admin",
    adminDashboard: "/admin/dashboard",
    adminProducts: "/admin/product",
    adminProductAdd: "/admin/product/add",
    adminProductUpdate: "/admin/product/update/:id",
    adminProductById: "/admin/product/:id",
    adminOutfitPage: "/admin/outfit",
    adminOutfitAdd: "/admin/outfit/add",
    adminOutfitUpdate: "/admin/outfit/update/:id",
    adminOutfitById: "/admin/outfit/:id",
    adminCategorys: "/admin/category",
    adminCategoryAdd: "/admin/category/add",
    adminCategoryUpdate: "/admin/category/update/:id",
    adminUsers: "/admin/user",
    adminUserInfo: "/admin/user/:id",
    adminUserUpdate: "/admin/user/update/:id",
    adminOrdersPage: "/admin/order",
    adminOrderUpdate: "/admin/order/:id",
    adminVoucherPage: "/admin/voucher",
    adminVoucherAdd: "/admin/voucher/add",
    adminVoucherUpdate: "/admin/voucher/update/:id",
    adminStatistic: "/admin/statistic",
    adminProductRevanue: "/admin/statistic/by_product",
    adminOrderRevanue: "/admin/statistic/by_order",
    adminOrderRevanueByDate: "/admin/statistic/by_date",
    adminOrderRevanueByWeek: "/admin/statistic/by_week",
    adminOrderRevanueByMonth: "/admin/statistic/by_month",
    adminOrderRevanueByQuarter: "/admin/statistic/by_quarter",
    adminOrderReturnPage: "/admin/orderreturn",
    adminOrderReturnGetOne: "/admin/orderreturn/:id",

    // page not found
    pageNotFound: "*"
}

export default routes;