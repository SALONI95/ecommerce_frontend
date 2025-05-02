import { IUser } from "@/types/types";
import { getTokenFromLocalStorage } from "@/lib/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "@/lib/api/authService";
const token = getTokenFromLocalStorage();
// let user: IUser | null;
// const payload: IUser | null = token ? jwtDecode(token) : null

// if (!payload) {
//     user = null
// } else {
//     user = payload as IUser
// }

export const getUserData = createAsyncThunk(
  "getRefreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authService.getUserData();
      return data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

type InitialState = {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: any; //string | null;
  isLoggedIn: boolean;
};

const initialState: InitialState = {
  user: null,
  token: token || null,
  loading: true,
  error: null,
  isLoggedIn: getTokenFromLocalStorage() ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserloggedIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.isLoggedIn = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    setUserLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
    addToWishlist: (state, action) => {
      state.user?.wishlist.products?.push(action.payload.productId);
      return state;
    },
    removeFromWishlist: (state, action) => {
      const products = state.user?.wishlist?.products?.filter(
        (item) => item !== action.payload.productId
      );
      if (state.user) {
        if (state.user.wishlist) {
          state.user.wishlist.products = products;
        }
      }

      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload || "unknown error";
        state.loading = false;
      });
  },
});

export const {
  setUserloggedIn,
  setUserLogout,
  setLoading,
  setError,
  addToWishlist,
  removeFromWishlist,
} = authSlice.actions;
export default authSlice.reducer;
