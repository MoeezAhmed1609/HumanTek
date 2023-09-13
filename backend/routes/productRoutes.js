const express = require("express");
// Controller
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");
// Router
const router = express.Router();

// Routes
router.get("/products", getAllProducts);
router.post(
  "/products/create",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  createProduct
);
router.put(
  "/products/update/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  updateProduct
);
router.delete(
  "/products/delete/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteProduct
);
router.get(
  "/products/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  getProductDetails
);

module.exports = router;
