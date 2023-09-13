import React from "react";
import { Button } from "@mui/material";

const StyledButton = ({ title, mode, validation, onClick, width }) => {
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 0",
        cursor: "pointer",
        backgroundColor: mode === "dark" ? "black" : "white",
        color: mode === "dark" ? "white" : "black",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2);",
        "&:hover,& .css-hnghlo-MuiButtonBase-root-MuiButton-root": {
          color: mode === "dark" ? "black" : "white",
          backgroundColor: mode === "dark" ? "white" : "black",
        },
        width: width || "100%",
      }}
      className="swiper-btn"
      disabled={validation}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default StyledButton;
