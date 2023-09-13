import { createSlice } from "@reduxjs/toolkit";

const itemsReducer = createSlice({
  name: "items",
  initialState: {
    items: localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [],
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      state.items = [...state.items, product];
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items.splice(
        state.items.findIndex((item) => item.product._id === action.payload),
        1
      );
      localStorage.setItem("items", JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem } = itemsReducer.actions;

export default itemsReducer.reducer;
