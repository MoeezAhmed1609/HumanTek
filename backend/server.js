const app = require("./app");
const connectMongoDB = require("./config/mongodb.js");
const cloudinary = require("cloudinary");

// Handling Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to uncaught exceptions");
  // Exit Server
  server.close(() => process.exit(1));
});

// Configuration
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/.env" });
}

// MongoDB connection
connectMongoDB();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on port " + process.env.PORT);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejections");
  // Exit Server
  server.close(() => process.exit(1));
});
