import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import StyledTextField from "../components/StyledTextField";
import InvoiceCard from "../components/InvoiceCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StyledButton from "../components/StyledButton";

const Invoices = () => {
  const [query, setQuery] = useState("");
  const { data } = useSelector((state) => state.invoices);
  const invoices = data?.invoices;
  const filteredInvoices = [];
  invoices?.map((item) =>
    item?.products?.map((i) =>
      i?.name?.toLowerCase()?.includes(query.toLowerCase())
        ? filteredInvoices.push(item)
        : null
    )
  );
  return (
    <>
      <Box sx={{ height: "23vh", width: "100%" }} />
      <Grid
        container
        sx={{
          width: "100%",
          padding: "0 5%",
        }}
      >
        <Grid item xs={12} sx={{ padding: { Xs: "0 5%", sm: "0 25%" } }}>
          <StyledTextField
            title={"Search Invoice by Products"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        {filteredInvoices?.length > 0 ? (
          filteredInvoices.map((invoice, i) => (
            <Grid key={i} item xs={12} sm={4} sx={{ padding: "10px" }}>
              <InvoiceCard invoice={invoice} />
            </Grid>
          ))
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
              No Invoices!
            </Typography>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "black", width: "40%" }}
            >
              <StyledButton title={"Create!"} mode={"dark"} />
            </Link>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Invoices;
