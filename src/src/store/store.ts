import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
// import { wishlistSlice } from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // wishlist: wishlistSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
