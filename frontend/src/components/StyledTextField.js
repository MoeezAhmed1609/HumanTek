import React from "react";
import { TextField } from "@mui/material";

const StyledTextField = ({
  title,
  type,
  value,
  onChange,
  error,
  helperText,
  width,
  readOnly,
  bottom,
  variant,
}) => {
  return (
    <TextField
      label={title}
      variant={variant || "outlined"}
      sx={{
        width: width || "100%",
        marginBottom: bottom || "22px",
        "& label.Mui-focused": {
          color: "black",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "black",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "1.5px solid black",
          },
          "&:hover fieldset": {
            borderColor: "black",
          },
          "&.Mui-focused fieldset": {
            borderColor: "black",
          },
        },
      }}
      InputProps={{
        readOnly: readOnly || false,
      }}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default StyledTextField;
