// src/store/giftSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Gift = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
};

interface GiftState {
  gifts: Gift[];
}

const initialState: GiftState = {
  gifts: [],
};

const giftSlice = createSlice({
  name: "gifts",
  initialState,
  reducers: {
    saveGifts: (state: GiftState, action: PayloadAction<Gift[]>) => {
      state.gifts = action.payload;
    },
  },
});

export const { saveGifts } = giftSlice.actions;
export default giftSlice.reducer;
