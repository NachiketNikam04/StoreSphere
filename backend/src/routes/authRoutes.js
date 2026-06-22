const express =
  require("express");

const router =
  express.Router();

const {
  signup,
  login,
  forgotPassword,
  changePassword,
  getCurrentUser,
  updateProfile,
} = require(
  "../controllers/authController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

router.post(
  "/signup",
  signup
);

router.post(
  "/login",
  login
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/change-password",
  authMiddleware,
  changePassword
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

module.exports = router;