import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActions,
  CardActionArea,
} from "@mui/material";
import StyledButton from "./StyledButton";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/reducers/itemsReducer";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const handleAddToInvoice = (p) => {
    if (!isAuthenticated) {
      toast("You are not Logged In!");
      return;
    }
    dispatch(addItem({ product: p }));
    // const array = window.localStorage.getItem("invoice")
    //   ? JSON.parse(localStorage.getItem("invoice"))
    //   : [];
    // array.push(p);
    // window.localStorage.setItem("invoice", JSON.stringify(array));
    toast.success("Added!");
  };
  return (
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
            <Typography gutterBottom variant="subtitle1" component="div">
              {product?.name}
            </Typography>
            <Typography variant="subtitle1">${product?.price}.00</Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {product?.category}
          </Typography>
        </CardContent>
        <CardActions>
          <StyledButton
            title="Add to Invoice"
            mode="dark"
            onClick={() => {
              handleAddToInvoice(product);
            }}
          />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
