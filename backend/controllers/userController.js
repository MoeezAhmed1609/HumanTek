const User = require("../models/UserModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/JWTToken");

// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 200, res);
});

// Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter a valid email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }
  const isPasswordChecked = await user.checkPassword(password);
  if (!isPasswordChecked) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }
  sendToken(user, 200, res);
});

// Logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully!" });
});

// Get all users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find().populate("orders.items.product");
  res.status(200).json({ users });
});

// Delete user (admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler("User does not exist with ID " + req.params.id, 400)
    );
  }
  user = await User.findByIdAndDelete(req.params.id);
  // We will remove cloudinary later
  res.status(200).json({ message: "User deleted successfully!" });
});

// Get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ user });
});
