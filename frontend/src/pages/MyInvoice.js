import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import InvoiceTable from "../components/InvoiceTable";
import StyledButton from "../components/StyledButton";
import toast from "react-hot-toast";
import { createInvoice } from "../redux/actions/invoiceActions";

const MyInvoice = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const me = user?.data?.user;
  // Invoice Items
  const { items } = useSelector((state) => state.items);
  let totalAmount = 0;
  const productIds = [];
  items?.forEach((p) => {
    totalAmount += Number(p.product.price);
    productIds.push(p.product._id);
  });
  //   Create Invoice
  const handleCreateInvoice = () => {
    if (!isAuthenticated) {
      toast.error("You are not Logged In!");
      return;
    }
    if (items?.length === 0) {
      toast.error("Add a Product!");
      return;
    }
    const invoice = {
      user: me?._id,
      products: productIds,
      total: totalAmount,
    };
    dispatch(createInvoice(invoice));
    window.localStorage.removeItem("items");
  };
  return (
    <>
      <Box sx={{ height: "27vh", width: "100%" }} />
      <Grid
        container
        sx={{
          width: "100%",
          padding: "0 5%",
        }}
      >
        {isAuthenticated ? (
          <>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ paddingRight: { xs: "0px", sm: "10px" } }}
            >
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
                  {me?.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {me?.email}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Total products: {items?.length}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    marginBottom: "14px",
                  }}
                >
                  Total amount: ${totalAmount}.00
                </Typography>
                <StyledButton
                  title={"Create Invoice"}
                  mode="dark"
                  onClick={handleCreateInvoice}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                paddingLeft: { xs: "0px", sm: "10px" },
                paddingTop: { xs: "15px", sm: "0" },
              }}
            >
              <InvoiceTable products={items} />
            </Grid>
          </>
        ) : (
          <Grid
            item
            xs={12}
            sx={{
              height: "40vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "800" }}
            >
              Please Log In!
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MyInvoice;
