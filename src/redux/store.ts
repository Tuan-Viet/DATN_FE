import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./reducer/categorySlice";

const store = configureStore({
    reducer: {
        Category: categorySlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;