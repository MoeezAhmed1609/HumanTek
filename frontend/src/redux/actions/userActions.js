import axios from "axios";
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
import toast from "react-hot-toast";

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const data = await axios({
      url: "/api/v1/user/login",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        email,
        password,
      },
    }).then((res) => {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res });
      toast.success("Logged In!");
    });
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAIL, payload: error.message });
    toast.error("Something went wrong, reload & try again!");
  }
};

// Register user
export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const data = await axios({
      url: "/api/v1/user/register",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        name,
        email,
        password,
      },
    }).then((res) => {
      dispatch({ type: REGISTER_USER_SUCCESS, payload: res });
      toast.success("Registered!");
    });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.message });
    toast.error("Something went wrong, reload & try again!");
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_REQUEST });
  const data = await axios
    .get("/api/v1/user/logout")
    .then((res) => {
      dispatch({ type: LOGOUT_USER_SUCCESS, payload: res });
      toast.success("Logged Out!");
    })
    .catch((err) => {
      dispatch({ type: LOGOUT_USER_FAIL, error: err });
      toast.error("Something went wrong, reload & try again!");
    });
};

// Admin Routes Actions
// get all users
// export const getAllUsers = () => async (dispatch) => {
//   try {
//     dispatch({ type: GET_ALL_USER_DETAILS_REQUEST });
//     const data = await axios.get("/api/v1/admin/users");
//     dispatch({
//       type: GET_ALL_USER_DETAILS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_ALL_USER_DETAILS_FAIL,
//       payload: error.message,
//     });
//   }
// };

// update user role
// export const updateUserRole = (id, role) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_USER_ROLE_REQUEST });
//     const data = await axios({
//       url: `/api/v1/admin/users/${id}`,
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       data: {
//         role,
//       },
//     });
//     dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: UPDATE_USER_ROLE_FAIL, payload: error.message });
//   }
// };

// delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const data = await axios({
      url: `/api/v1/admin/users/${id}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      dispatch({ type: DELETE_USER_SUCCESS, payload: res });
      toast.success("User Deleted, Reloading!");
      window.setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.message,
    });
    toast.error("Something went wrong, reload & try again!");
  }
};

// Get Logged in user details
export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const data = await axios.get("/api/v1/user/me");
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
