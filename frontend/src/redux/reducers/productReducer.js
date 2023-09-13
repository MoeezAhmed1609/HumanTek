import { createReducer } from "@reduxjs/toolkit";
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

const initialState = {
  products: [],
  product: {},
};

export const productsReducer = createReducer(
  initialState.products,
  (builder) => {
    builder.addCase(GET_ALL_PRODUCTS_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(GET_ALL_PRODUCTS_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload.data,
      };
    });
    builder.addCase(GET_ALL_PRODUCTS_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(CREATE_PRODUCT_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(CREATE_PRODUCT_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(CREATE_PRODUCT_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(DELETE_PRODUCT_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(DELETE_PRODUCT_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(DELETE_PRODUCT_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
    builder.addCase(UPDATE_PRODUCT_REQUEST, (state, action) => {
      return {
        loading: true,
        data: [],
      };
    });
    builder.addCase(UPDATE_PRODUCT_SUCCESS, (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(UPDATE_PRODUCT_FAIL, (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    });
  }
);

export const productReducer = createReducer(initialState.product, (builder) => {
  builder.addCase(GET_PRODUCT_DETAILS_REQUEST, (state, action) => {
    return {
      loading: true,
      data: {},
    };
  });
  builder.addCase(GET_PRODUCT_DETAILS_SUCCESS, (state, action) => {
    return {
      loading: false,
      data: action.payload.data,
    };
  });
  builder.addCase(GET_PRODUCT_DETAILS_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
});
