import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { data } = useSelector((state) => state.products);
  return (
    <>
      <Box sx={{ height: "22vh", width: "100%" }} />
      <Grid
        container
        sx={{
          width: "100%",
          padding: { xs: "0 7%", sm: "0 12%" },
        }}
      >
        <Grid item xs={12} sx={{ minHeight: "14vh", textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}
          >
            Greetings, HumanTek!
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}
          >
            Loved your Place, Hoping for hiring!
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 4, marginBottom: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: "Poppins, sans-serif" }}>
            Products for Invoice
          </Typography>
        </Grid>
        {data?.products?.map((product, i) => (
          <Grid item xs={12} key={i} sm={4} sx={{ padding: "12px 8px" }}>
            <ProductCard product={product} key={i} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
