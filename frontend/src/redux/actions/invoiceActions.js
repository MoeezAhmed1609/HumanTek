import axios from "axios";
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
import toast from "react-hot-toast";

// Get All Invoices
export const getAllInvoices = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_INVOICES_REQUEST });
    const data = await axios.get("/api/v1/invoices");
    dispatch({ type: GET_ALL_INVOICES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_INVOICES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create new invoice
export const createInvoice = (invoice) => async (dispatch) => {
  dispatch({ type: CREATE_INVOICE_REQUEST });
  const data = await axios({
    url: "/api/v1/invoices/create",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      invoice,
    },
  })
    .then((res) => {
      dispatch({ type: CREATE_INVOICE_SUCCESS, payload: res.data });
      toast.success("Invoice Created, Reloading!");
      window.setTimeout(function () {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      dispatch({ type: CREATE_INVOICE_FAIL, payload: err });
      toast.error("Something went wrong, reload & try again!");
    });
};

// delete invoice
export const deleteInvoice = (id) => async (dispatch) => {
  dispatch({ type: DELETE_INVOICE_REQUEST });
  const data = await axios({
    url: `/api/v1/invoices/delete/${id}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      dispatch({ type: DELETE_INVOICE_SUCCESS, payload: res });
      toast.success("Invoice Deleted, Reloading!");
      window.setTimeout(function () {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      dispatch({
        type: DELETE_INVOICE_FAIL,
        payload: err,
      });
      toast.error("Something went wrong, reload & try again!");
    });
};
