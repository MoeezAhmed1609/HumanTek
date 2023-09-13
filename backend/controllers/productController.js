const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");

// Create Product | Admin
exports.createProduct = catchAsyncError(async (req, res) => {
  const { name, description, price, image } = req.body.product;
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "tek-products",
  });
  const product = await Product.create({
    name,
    description,
    price,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    admin: req.user.id,
  });
  res.status(200).json({ message: "Product created successfully!", product });
});

// Get All products | Admin / Users
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
});

// Update Product | Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found!", 404));
  const { name, description, price, image } = req.body.product;
  let photo;
  if (typeof image === "string") {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "tek-products",
    });
    photo = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } else {
    photo = image;
  }
  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      image: photo,
      admin: req.user.id,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    }
  );
  res.status(200).json({ message: "Product updated successfully!", product });
});

// Delete Product | Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found!", 404));
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Product deleted successfully!" });
});

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  res.status(200).json({ product });
});
