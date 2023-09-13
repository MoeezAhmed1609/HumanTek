const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  deleteUser,
  getUserDetails,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  isAuthorizedRole,
} = require("../middlewares/auth");

router.get("/user/me", isAuthenticatedUser, getUserDetails);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  getAllUsers
);
router.delete(
  "/admin/users/:id",
  isAuthenticatedUser,
  isAuthorizedRole("Admin"),
  deleteUser
);

module.exports = router;
