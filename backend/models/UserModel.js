const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User's name required!"],
    maxLength: [30, "Username cannot exceed 30 characters"],
    minLength: [3, "Username must contain at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email required!"],
    unique: true,
    validate: [validator.isEmail, "Invalid email!"],
  },
  password: {
    type: String,
    required: [true, "Password required!"],
    minLength: [8, "Password must contain at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "User",
  },
  invoices: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Invoice",
    },
  ],
});

// Hashing password with bcryptjs
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// JWT Token Authentication
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Check Password
userSchema.methods.checkPassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
