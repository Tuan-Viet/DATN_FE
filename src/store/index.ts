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
  productDetailFilterSliceReducer,
} from "./productDetail/productDetailSlice";
import productDetailAPI from "./productDetail/productDetail.service";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from "./user/userSlice";

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
    categorySlice: categorySlice,
    productSlice: productSliceReducer,
    productDetailSlice: productDetailSlice,
    productFilterSlice: productFilterSliceReducer,
    productSaleSlice: productSaleSliceReducer,
    productSearchReducer: productSearchReducer,
    productOutstandReducer: productOutstandReducer,
    productRelatedSliceReducer: productRelatedSliceReducer,
    productDetailFilterSliceReducer: productDetailFilterSliceReducer,
    user: persistReducer(userConfig, userSlice)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoryApi.middleware)
      .concat(productAPI.middleware)
      .concat(productDetailAPI.middleware),
});

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
