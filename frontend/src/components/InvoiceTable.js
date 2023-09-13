import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import StyledButton from "./StyledButton";
import { Link } from "react-router-dom";

export default function InvoiceTable({ products }) {
  return products.length > 0 ? (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  src={row.product.image?.url}
                  alt={row.product.name}
                  style={{ height: "60px" }}
                />
              </TableCell>
              <TableCell>{row.product.name}</TableCell>
              <TableCell>${row.product.price}.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box
      component={Paper}
      sx={{
        width: "100%",
        height: "49vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "800" }}
      >
        No Products!
      </Typography>
      <Link
        to="/"
        style={{ textDecoration: "none", color: "black", width: "40%" }}
      >
        <StyledButton title={"Add Some!"} mode={"dark"} />
      </Link>
    </Box>
  );
}
