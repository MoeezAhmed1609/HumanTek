import React from "react";
import { Box } from "@mui/material";
import Create from "./Create";
import Update from "./Update";
import ReadDelete from "./ReadDelete";

const Product = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: "70vh",
        }}
      >
        {/* All Product */}
        <ReadDelete />
        {/* Create Product */}
        <Create />
        {/* Update Product */}
        <Update />
      </Box>
    </>
  );
};

export default Product;
