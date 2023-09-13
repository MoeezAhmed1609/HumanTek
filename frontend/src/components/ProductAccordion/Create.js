import React, { useState, useRef } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  Grid,
  CircularProgress,
  AccordionDetails,
  Box,
  Badge,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import StyledButton from "../StyledButton";
import StyledTextField from "../StyledTextField";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { createProduct } from "../../redux/actions/productActions";

const Create = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state?.products);
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dispatch = useDispatch();

  // Create Product
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageRemove = (image) => {
    setImage("");
  };
  // Image Uploader
  const hiddenFileInput = useRef(null);
  const handleImageClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader?.readAsDataURL(e.target.files[0]);
  };
  const handleCreateProduct = () => {
    if (!isAuthenticated) {
      toast("You are not Logged In!");
      return;
    }
    if (user?.data?.user?.role !== "Admin") {
      toast("You are not Admin!");
      return;
    }
    if (name.length === 0 || name.length < 6) {
      setIsError(true);
      setErrorMessage("Enter a proper product name!");
      return;
    }
    if (price === 0 || price > 99999) {
      setIsError(true);
      setErrorMessage("Enter a valid price! (1 - 99999)");
      return;
    }
    if (description.length === 0 || description.length < 20) {
      setIsError(true);
      setErrorMessage(
        "Enter a proper product description! (at least 20 letters required)"
      );
      return;
    }
    const product = {
      name,
      description,
      price,
      image,
    };
    dispatch(createProduct(product));
  };

  const fields = [
    {
      create: true,
      code: (
        <StyledTextField
          title={"Products Name"}
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ),
      xs: 6,
      update: true,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledTextField
          title={"Product Price"}
          type={"number"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      ),
      xs: 6,
    },
    {
      create: true,
      update: true,
      code: (
        <textarea
          style={{
            height: "76px",
            width: "100%",
            border: "1.5px solid black",
            borderRadius: "4px",
            padding: "4px 6px",
            fontFamily: "sans-serif",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description here..."
        />
      ),
      xs: 6,
    },
    {
      create: true,
      code: (
        <>
          <Box
            sx={{
              height: "75px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              border: "1.5px solid black",
              borderRadius: "4px",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <Box sx={{ height: "75px", display: "flex", alignItems: "center" }}>
              {image ? (
                <Badge
                  overlap="circular"
                  badgeContent={
                    <IconButton
                      sx={{ height: "20px", width: "20px" }}
                      onClick={() => handleImageRemove(image)}
                    >
                      <CloseIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                  }
                >
                  <img
                    src={image}
                    alt="Product"
                    style={{ height: "68px", margin: "0 3px" }}
                  />
                </Badge>
              ) : (
                <Typography variant="subtitle1" sx={{ paddingLeft: "10px" }}>
                  No images
                </Typography>
              )}
            </Box>
            <input
              type="file"
              ref={hiddenFileInput}
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <StyledButton
              title={"Upload"}
              mode={"dark"}
              width={"25%"}
              onClick={handleImageClick}
            />
          </Box>
        </>
      ),
      xs: 6,
      update: false,
    },
    {
      create: true,
      update: true,
      code: (
        <StyledButton
          title="Create Product"
          mode={"dark"}
          validation={!name || !price || !description || !image}
          onClick={() => handleCreateProduct()}
        />
      ),
      xs: 12,
    },
  ];
  return (
    <Accordion
      expanded={expanded === "panel2"}
      onChange={handleChange("panel2")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2bh-content"
        id="panel2bh-header"
      >
        <Typography sx={{ textAlign: "center", width: "100%" }}>
          Create Product
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "10px 30px" }}>
        <Grid container>
          {isError && (
            <Grid item sx={{ height: "50px" }} xs={12}>
              <Typography variant="subtitle2" sx={{ color: "red" }}>
                {errorMessage}
              </Typography>
            </Grid>
          )}
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
            fields?.map((field, i) => (
              <Grid item xs={12} sm={field.xs} key={i} sx={{ padding: "10px" }}>
                {field.code}
              </Grid>
            ))
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Create;
