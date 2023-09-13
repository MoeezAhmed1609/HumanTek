import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Badge,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StyledButton from "../StyledButton";
import StyledTextField from "../StyledTextField";
import {
  updateProduct,
  getProductDetails,
} from "../../redux/actions/productActions";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";

const Update = () => {
  const details = useSelector((state) => state.product);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state?.products);
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dispatch = useDispatch();
  const product = details?.data?.product;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (product) {
      setName(product?.name);
      setDescription(product?.description);
      setPrice(product?.price);
      setImage(product?.image);
    }
  }, [product]);
  // Update
  const [id, setId] = useState(product?._id || "");
  const handleGetProductDetails = () => {
    if (!isAuthenticated) {
      toast("You are not Logged In!");
      return;
    }
    if (user?.data?.user?.role !== "Admin") {
      toast.error("You are not Admin!");
      return;
    }
    dispatch(getProductDetails(id));
    setName(product?.name);
  };
  const handleOldImageRemove = (image) => {
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
  const handleUpdateProduct = () => {
    if (!isAuthenticated) {
      toast("You are not Logged In!");
      return;
    }
    if (user?.data?.user?.role !== "Admin") {
      toast("You are not Admin!");
      return;
    }
    if (name.length === 0 && name.length < 6) {
      setIsError(true);
      setErrorMessage("Enter a proper product name!");
      return;
    }
    if (price === 0 && price > 99999) {
      setIsError(true);
      setErrorMessage("Enter a valid price! (1 - 99999)");
      return;
    }
    if (description.length === 0 && description.length < 20) {
      setIsError(true);
      setErrorMessage(
        "Enter a proper product description! (at least 20 letters required)"
      );
      return;
    }
    // if (images.length === 0 && oldImages.length === 0) {
    //   setIsError(true);
    //   setErrorMessage("Upload at least one product image!");
    //   return;
    // }
    const product = {
      name,
      description,
      price,
      image,
    };
    dispatch(updateProduct(id, product));
  };
  const updateFields = [
    {
      code: (
        <>
          <StyledTextField
            title={"Product ID"}
            type={"text"}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </>
      ),
      xs: 8,
    },
    {
      code: (
        <>
          <StyledButton
            title={"Find"}
            validation={!id}
            mode={"dark"}
            onClick={() => handleGetProductDetails()}
          />
        </>
      ),
      xs: 4,
    },
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
    // {
    //   create: true,
    //   code: (
    //     <>
    //       <Box
    //         sx={{
    //           height: "75px",
    //           width: "100%",
    //           display: "flex",
    //           alignItems: "center",
    //           border: "1.5px solid black",
    //           borderRadius: "4px",
    //           justifyContent: "space-between",
    //           padding: "5px",
    //         }}
    //       >
    //         <Box sx={{ height: "75px", display: "flex", alignItems: "center" }}>
    //           {oldImage ? (
    //             <Badge
    //               overlap="circular"
    //               badgeContent={
    //                 <IconButton
    //                   sx={{ height: "20px", width: "20px" }}
    //                   onClick={() => handleOldImageRemove(oldImage)}
    //                 >
    //                   <CloseIcon sx={{ fontSize: "20px" }} />
    //                 </IconButton>
    //               }
    //             >
    //               <img
    //                 src={oldImage?.url}
    //                 alt="Product"
    //                 style={{ height: "68px", margin: "0 3px" }}
    //               />
    //             </Badge>
    //           ) : (
    //             <Typography variant="subtitle1" sx={{ paddingLeft: "10px" }}>
    //               No images
    //             </Typography>
    //           )}
    //         </Box>
    //       </Box>
    //     </>
    //   ),
    //   xs: 6,
    //   update: false,
    // },
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
                      onClick={() => handleOldImageRemove(image)}
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
          title="Update Product"
          mode={"dark"}
          validation={!name || !price || !description || !id || !image}
          onClick={() => handleUpdateProduct()}
        />
      ),
      xs: 12,
    },
  ];
  return (
    <Accordion
      expanded={expanded === "panel3"}
      onChange={handleChange("panel3")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3bh-content"
        id="panel3bh-header"
      >
        <Typography sx={{ textAlign: "center", width: "100%" }}>
          Update Product
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
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
            updateFields?.map((field, i) => (
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

export default Update;
