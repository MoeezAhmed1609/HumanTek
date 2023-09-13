import { createReducer } from "@reduxjs/toolkit";
import {
  GET_ALL_INVOICES_REQUEST,
  GET_ALL_INVOICES_SUCCESS,
  GET_ALL_INVOICES_FAIL,
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAIL,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAIL,
} from "../constants/invoiceConstants";

const initialState = {
  invoices: [],
};

export const invoiceReducer = createReducer(
  initialState.invoices,
  (builder) => {
    builder.addCase(GET_ALL_INVOICES_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(GET_ALL_INVOICES_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload.data,
      };
    });
    builder.addCase(GET_ALL_INVOICES_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(CREATE_INVOICE_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(CREATE_INVOICE_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(CREATE_INVOICE_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(DELETE_INVOICE_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(DELETE_INVOICE_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(DELETE_INVOICE_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
  }
);
