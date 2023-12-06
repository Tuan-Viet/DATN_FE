
import { configureStore } from '@reduxjs/toolkit'
import categoryApi from './category/category.service'
import productAPI from './product/product.service'
import categorySlice from './category/categorySlice'
import { productFilterSliceReducer, productOutstandReducer, productRelatedSliceReducer, productSaleSliceReducer, productSearchReducer, productSliceReducer, productViewedSliceReducer } from './product/productSlice'
import productDetailSlice, { productDetailFilterSliceReducer, productDetailIdReducer } from './productDetail/productDetailSlice'
import productDetailAPI from './productDetail/productDetail.service'
import cartAPI from './cart/cart.service'
import cartSlice from './cart/cartSlice'
import orderAPI from './order/order.service'
import orderSlice from './order/orderSlice'
import orderReturnSlice from './orderReturn/orderSlice'
import orderDetailAPI from './orderDetail/orderDetail.service'
import orderDetailSlice from './orderDetail/orderDetailSlice'
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from "./user/userSlice";
import voucherAPI from './vouchers/voucher.service'
import voucherSlice from './vouchers/voucherSlice'
import authApi from './user/user.service'
import orderReturnAPI from './orderReturn/order.service'

import statisticsApi from './statistic/statistic.service'
import ReviewApi from './reviews/review.service'
import reviewSlice, { reviewByRatingReducer, reviewByUserReducer } from './reviews/reviewSlice'

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
    [orderReturnAPI.reducerPath]: orderReturnAPI.reducer,
    [orderDetailAPI.reducerPath]: orderDetailAPI.reducer,
    [voucherAPI.reducerPath]: voucherAPI.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,

    [ReviewApi.reducerPath]: ReviewApi.reducer,
    // category
    categorySlice: categorySlice,
    // product
    productSlice: productSliceReducer,
    productFilterSlice: productFilterSliceReducer,
    productSaleSlice: productSaleSliceReducer,
    productSearchReducer: productSearchReducer,
    productOutstandReducer: productOutstandReducer,
    productRelatedSliceReducer: productRelatedSliceReducer,
    productViewedSliceReducer: productViewedSliceReducer,
    // productDetail
    productDetailSlice: productDetailSlice,
    productDetailFilterSliceReducer: productDetailFilterSliceReducer,
    productDetailIdReducer: productDetailIdReducer,
    // cart
    cartSlice: cartSlice,
    // order
    orderSlice: orderSlice,
    orderReturnSlice: orderReturnSlice,
    // orderDetail
    orderDetailSlice: orderDetailSlice,
    // user 
    user: persistReducer(userConfig, userSlice),
    userSlice: userSlice,
    // voucher

    voucherSlice: voucherSlice,
    // },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(categoryApi.middleware).concat(productAPI.middleware).concat(productDetailAPI.middleware).concat(cartAPI.middleware).concat(orderAPI.middleware).concat(orderReturnAPI.middleware).concat(orderDetailAPI.middleware).concat(authApi.middleware).concat(voucherAPI.middleware),
    //   voucherSlice: voucherSlice,
    // reivew
    reviewSlice: reviewSlice,
    reviewByRatingReducer: reviewByRatingReducer,
    // reviewByUserReducer: reviewByUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      categoryApi.middleware,
      productAPI.middleware,
      productDetailAPI.middleware,
      cartAPI.middleware,
      orderAPI.middleware,
      orderDetailAPI.middleware,
      voucherAPI.middleware,
      statisticsApi.middleware,
      ReviewApi.middleware,
      orderReturnAPI.middleware,
      authApi.middleware
    ])
  // getDefaultMiddleware().concat(categoryApi.middleware).concat(productAPI.middleware).concat(productDetailAPI.middleware).concat(cartAPI.middleware).concat(orderAPI.middleware).concat(orderDetailAPI.middleware).concat(voucherAPI.middleware)
  //   .concat(ReviewApi.middleware),
})


export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
