import { configureStore } from '@reduxjs/toolkit'
import categoryApi from './category/category.service'
import productAPI from './product/product.service'
import categorySlice from './category/categorySlice'
import { productFilterSliceReducer, productOutstandReducer, productSaleSliceReducer, productSearchReducer, productSliceReducer } from './product/productSlice'
import productDetailSlice from './productDetail/productDetailSlice'
import productDetailAPI from './productDetail/productDetail.service'



export const store = configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [productDetailAPI.reducerPath]: productDetailAPI.reducer,
        categorySlice: categorySlice,
        productSlice: productSliceReducer,
        productDetailSlice: productDetailSlice,
        productFilterSlice: productFilterSliceReducer,
        productSaleSlice: productSaleSliceReducer,
        productSearchReducer: productSearchReducer,
        productOutstandReducer: productOutstandReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryApi.middleware).concat(productAPI.middleware).concat(productDetailAPI.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch