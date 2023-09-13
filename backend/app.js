const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 10000,
  })
);
app.use(fileUpload());

// Routes Imports
const products = require("./routes/productRoutes");
const users = require("./routes/userRoutes");
const invoices = require("./routes/invoiceRoutes");

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", invoices);

// Middleware for Error Handling
app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
