// import { IProducts } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Items = {
  _id: string;
  title: string;
  images: string[];
  new_price: number;
  old_price: number;
};
type InitialState = {
  wishlistId: string | null;
  items: Items[];

  //Partial<IProducts[]>;//string[]
};
const initialState: InitialState = {
  wishlistId: null,
  items: [],
};
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Items>) => {
      const exists = state.items.find(
        (item) => item?._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    // setWishlist: (
    //   state,
    //   action: PayloadAction<{ _id: string; items: string[] }>
    // ) => {
    //   state.wishlistId = action.payload._id;
    //   state.items = action.payload.items;
    // },
    // removeFromWishlist: (state, action: PayloadAction<string>) => {
    //   state.items = state.items.filter((item) => item !== action.payload);
    // },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
