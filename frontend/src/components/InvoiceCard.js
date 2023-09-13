import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import StyledButton from "./StyledButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice } from "../redux/actions/invoiceActions";
import toast from "react-hot-toast";

const InvoiceCard = ({ invoice }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const handleDeleteInvoice = (id) => {
    if (!isAuthenticated) {
      toast("You are not Logged In!");
      return;
    }
    if (user?.data?.user?.role !== "Admin") {
      toast.error("You are not Admin!");
      return;
    }
    dispatch(deleteInvoice(id));
  };
  return (
    <Box
      sx={{
        padding: "40px 25px",
      }}
      component={Paper}
    >
      <Typography
        variant="h4"
        sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "800" }}
      >
        {invoice.user.name}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        {invoice.user.email}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        Total products: {invoice.products?.length}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Total amount: ${invoice.total}.00
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: "bold",
        }}
      >
        Products:
      </Typography>
      <Box sx={{ height: "100px", overflowY: "auto", marginBottom: "14px" }}>
        {invoice.products?.map((product, i) => (
          <Typography
            variant="subtitle2"
            key={i}
            sx={{
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {product.name}
          </Typography>
        ))}
      </Box>
      <StyledButton
        title={"Delete Invoice"}
        mode="dark"
        onClick={() => handleDeleteInvoice(invoice._id)}
      />
    </Box>
  );
};

export default InvoiceCard;
