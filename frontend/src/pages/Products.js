import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "datejs";
import ProductAccordion from "../components/ProductAccordion/ProductAccordion";

const Products = () => {
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
        <Grid
          item
          xs={12}
          sx={{
            height: "60px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}
          >
            CRUD APIs for Products
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ProductAccordion />
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
