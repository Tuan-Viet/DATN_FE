const routes = {
    //Client
    home: "/",
    banner: "/",
    about: "/about",
    products: "/products",
    productDetail: "/products/:id",
    cart: "/cart",
    signin: "/signin",
    signup: "/signup",

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


}

export default routes;