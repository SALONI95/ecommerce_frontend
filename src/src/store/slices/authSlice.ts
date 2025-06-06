import { IProducts, IUser } from "@/types/types";
import { getTokenFromLocalStorage } from "@/lib/api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
type Item = {
  _id: string;
  title: string;
  images: string[];
  new_price: number;
  old_price: number;
};
type InitialState = {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: any; //string | null;
  isLoggedIn: boolean;
  wishlist: {
    _id: string | null;
    items: Item[] | [];
  };
};

type Wishlist = {
  _id: string;
  items: Item[];
};

const initialState: InitialState = {
  user: null,
  token: token || null,
  loading: true,
  error: null,
  isLoggedIn: getTokenFromLocalStorage() ? true : false,
  wishlist: {
    _id: null,
    items: [],
  },
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
      state.wishlist._id = action.payload.wishlist?._id || null;
      state.wishlist.items = action.payload.wishlist?.items || [];
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    setUserLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.wishlist._id = null;
      state.wishlist.items = [];
    },
    setWishlist: (state, action: PayloadAction<Wishlist>) => {
      if (action.payload) {
        state.wishlist._id = action.payload._id;
        state.wishlist.items = action.payload.items;
        // state.wishlist.items.push(action.payload.items);
      }
      return state;
    },
    addToWishlist: (state, action: PayloadAction<Item | IProducts>) => {
      const items: Item = {
        _id: action.payload._id,
        title: action.payload.title,
        images: action.payload.images,
        new_price: action.payload.new_price,
        old_price: action.payload.old_price,
      };
      state.wishlist.items = [...state.wishlist.items, items];
      // state.wishlist?.items?.push(action.payload);
      return state;
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist.items = state.wishlist.items.filter(
        (item) => item._id !== action.payload
      );
      // const products = state.wishlist.items?.filter(
      //   (item) => item._id !== action.payload
      // );
      // if (state.wishlist && products) {
      //   state.wishlist.items = products;
      // }
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
        state.wishlist._id = action.payload.wishlist?._id || null;
        state.wishlist.items = action.payload.wishlist?.items || [];
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2Fsb25pIEdvd2FkaWEiLCJlbWFpbCI6InNhbG9uaWdvd2FkaWFAZ21haWwuY29tIiwiZGF0ZSI6IjIwMjUtMDYtMDMgMTE6MTg6NTQifQ.Wy89w8u6ameBuokykTf2fRQQ6pQczPmUT0_LnSgIsGo
