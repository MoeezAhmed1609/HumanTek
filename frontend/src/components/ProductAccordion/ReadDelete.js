import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StyledTextField from "../StyledTextField";
import StyledButton from "../StyledButton";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/productActions";
import toast from "react-hot-toast";

const ReadDelete = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // Get all products
  const { data, loading } = useSelector((state) => state?.products);
  const products = data?.products;
  // Search
  const [search, setSearch] = useState("");
  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 6;
  // Delete product
  const handleDeleteProduct = (id) => {
    if (!isAuthenticated) {
      toast("You are not Logged In!");
      return;
    }
    if (user?.data?.user?.role !== "Admin") {
      toast.error("You are not Admin!");
      return;
    }
    dispatch(deleteProduct(id));
  };
  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ textAlign: "center", width: "100%" }}>
          Read + Delete Products
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          sx={{
            width: "100%",
            minHeight: "80vh",
            // padding: "0 5%",
            margin: "20px 0",
          }}
        >
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <StyledTextField
              title={"Search here"}
              type={"text"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              width="75%"
            />
          </Grid>
          {loading ? (
            <Grid
              item
              xs={12}
              sx={{
                height: "45vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Grid>
          ) : (
            products
              ?.filter((product) =>
                product?.name?.toLowerCase()?.includes(search?.toLowerCase())
              )
              .slice((page - 1) * perPage, page * perPage)
              ?.map((product, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{ padding: "16px 10px" }}
                >
                  <Card sx={{ boxShadow: "none" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="230px"
                        image={product?.image?.url}
                        alt={product?.name}
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {product?.name}
                          </Typography>
                          <Typography variant="subtitle1">
                            ${product?.price}.00
                          </Typography>
                        </Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {product?.category}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ gap: "0 6px" }}>
                        <StyledButton
                          title="Copy ID"
                          mode="dark"
                          width={"50%"}
                          onClick={() => {
                            navigator.clipboard.writeText(product?._id);
                          }}
                        />
                        <StyledButton
                          title="Remove"
                          mode="light"
                          width={"50%"}
                          onClick={() => handleDeleteProduct(product?._id)}
                        />
                      </CardActions>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
          )}
          {products?.length > 6 && (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Pagination
                count={Math.ceil(products?.length / perPage)}
                defaultPage={page}
                onChange={(event, value) => setPage(value)}
              />
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReadDelete;
