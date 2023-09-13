const Invoice = require("../models/InvoiceModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Create Invoice
exports.createInvoice = catchAsyncError(async (req, res) => {
  const { user, products, total } = req.body.invoice;
  const invoice = await Invoice.create({
    user,
    products,
    total,
  });
  res.status(200).json({ message: "Invoice created successfully!", invoice });
});

// Get All products | Admin / Users
exports.getAllInvoices = catchAsyncError(async (req, res) => {
  const invoices = await Invoice.find().populate("user").populate("products");
  res.status(200).json({ invoices });
});

// Delete Invoice | Admin
exports.deleteInvoice = catchAsyncError(async (req, res, next) => {
  let invoice = await Invoice.findById(req.params.id);
  if (!invoice) return next(new ErrorHandler("Invoice not found!", 404));
  invoice = await Invoice.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Invoice deleted successfully!" });
});
