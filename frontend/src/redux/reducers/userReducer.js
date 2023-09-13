import { createReducer } from "@reduxjs/toolkit";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  // GET_ALL_USER_DETAILS_REQUEST,
  // GET_ALL_USER_DETAILS_SUCCESS,
  // GET_ALL_USER_DETAILS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from "../constants/userConstants";

const initialState = {
  user: {},
  users: [],
};
export const userReducer = createReducer(initialState.users, (builder) => {
  builder.addCase(GET_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(GET_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: true,
      user: action.payload,
    };
  });
  builder.addCase(GET_USER_FAIL, (state, action) => {
    return {
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  });
  builder.addCase(LOGIN_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(LOGIN_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: true,
      user: action.payload,
    };
  });
  builder.addCase(LOGIN_USER_FAIL, (state, action) => {
    return {
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  });
  builder.addCase(REGISTER_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(REGISTER_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: true,
      user: action.payload,
    };
  });
  builder.addCase(REGISTER_USER_FAIL, (state, action) => {
    return {
      loading: false,
      isAuthenticated: false,
      user: null,
      error: action.payload,
    };
  });
  builder.addCase(LOGOUT_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isAuthenticated: false,
    };
  });
  builder.addCase(LOGOUT_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isAuthenticated: false,
      user: null,
    };
  });
  builder.addCase(LOGOUT_USER_FAIL, (state, action) => {
    return {
      loading: false,
      error: action.payload,
    };
  });
  builder.addCase(DELETE_USER_REQUEST, (state, action) => {
    return {
      loading: true,
      isUpdated: false,
    };
  });
  builder.addCase(DELETE_USER_SUCCESS, (state, action) => {
    return {
      loading: false,
      isUpdated: true,
      user: action.payload,
    };
  });
  builder.addCase(DELETE_USER_FAIL, (state, action) => {
    return {
      loading: false,
      isUpdated: false,
      error: action.payload,
    };
  });
});

// export const allUserReducer = createReducer(initialState.user, (builder) => {

// });
