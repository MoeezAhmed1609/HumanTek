const express = require("express");
// Controller
const {
  getAllInvoices,
  createInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");
// Router
const router = express.Router();

// Routes
router.get(
  "/invoices",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  getAllInvoices
);
router.post("/invoices/create", isAuthenticatedUser, createInvoice);
router.delete(
  "/invoices/delete/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteInvoice
);

module.exports = router;
