import { configureStore } from "@reduxjs/toolkit";
import categoryApi from "./category/category.service";
import productAPI from "./product/product.service";
import categorySlice from "./category/categorySlice";
import {
  productFilterSliceReducer,
  productOutstandReducer,
  productRelatedSliceReducer,
  productSaleSliceReducer,
  productSearchReducer,
  productSliceReducer,
} from "./product/productSlice";
import productDetailSlice, {
  productDetailFilterSliceReducer, productDetailIdReducer,
} from "./productDetail/productDetailSlice";
import productDetailAPI from "./productDetail/productDetail.service";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from "./user/userSlice";
import cartAPI from "./cart/cart.service";
import orderAPI from "./order/order.service";
import orderDetailAPI from "./orderDetail/orderDetail.service";
import cartSlice, { cartLocalReducer } from "./cart/cartSlice";
import orderSlice from "./order/orderSlice";
import orderDetailSlice from "./orderDetail/orderDetailSlice";

const commonConfig = {
  key: "user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "current", "token"],
};

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [productDetailAPI.reducerPath]: productDetailAPI.reducer,
    [cartAPI.reducerPath]: cartAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [orderDetailAPI.reducerPath]: orderDetailAPI.reducer,
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
    user: persistReducer(userConfig, userSlice),
    // cart
    cartSlice: cartSlice,
    cartLocalReducer: cartLocalReducer,
    // order
    orderSlice: orderSlice,
    // orderDetail
    orderDetailSlice: orderDetailSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware).concat(productAPI.middleware).concat(productDetailAPI.middleware).concat(cartAPI.middleware).concat(orderAPI.middleware).concat(orderDetailAPI.middleware),
})

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
