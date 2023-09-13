import { configureStore } from "@reduxjs/toolkit";

// Reducers Import
import { productReducer, productsReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { invoiceReducer } from "./reducers/invoiceReducer";
import itemsReducer from "./reducers/itemsReducer";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    user: userReducer,
    invoices: invoiceReducer,
    items: itemsReducer,
  },
});
