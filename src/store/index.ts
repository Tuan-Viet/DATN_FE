import { configureStore } from '@reduxjs/toolkit'
import categoryApi from './category/category.service'
import productAPI from './product/product.service'
import categorySlice from './category/categorySlice'
import { productFilterSliceReducer, productOutstandReducer, productRelatedSliceReducer, productSaleSliceReducer, productSearchReducer, productSliceReducer } from './product/productSlice'
import productDetailSlice, { productDetailFilterSliceReducer, productDetailIdReducer } from './productDetail/productDetailSlice'
import productDetailAPI from './productDetail/productDetail.service'
import cartAPI from './cart/cart.service'
import cartSlice, { cartLocalReducer } from './cart/cartSlice'



export const store = configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [productDetailAPI.reducerPath]: productDetailAPI.reducer,
        [cartAPI.reducerPath]: cartAPI.reducer,
        // category
        categorySlice: categorySlice,
        // product
        productSlice: productSliceReducer,
        productFilterSlice: productFilterSliceReducer,
        productSaleSlice: productSaleSliceReducer,
        productSearchReducer: productSearchReducer,
        productOutstandReducer: productOutstandReducer,
        productRelatedSliceReducer: productRelatedSliceReducer,
        // productDetail
        productDetailSlice: productDetailSlice,
        productDetailFilterSliceReducer: productDetailFilterSliceReducer,
        productDetailIdReducer: productDetailIdReducer,
        // cart
        cartSlice: cartSlice,
        cartLocalReducer: cartLocalReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryApi.middleware).concat(productAPI.middleware).concat(productDetailAPI.middleware).concat(cartAPI.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch