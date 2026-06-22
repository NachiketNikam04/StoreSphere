const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const roleMiddleware =
  require(
    "../middleware/roleMiddleware"
  );

const {
  getDashboard,
  getReviews,
  updateStore,
} = require(
  "../controllers/ownerController"
);

router.use(
  authMiddleware
);

router.use(
  roleMiddleware(
    "STORE_OWNER"
  )
);

router.get(
  "/dashboard",
  getDashboard
);

router.get(
  "/reviews",
  getReviews
);

router.put(
  "/store/:id",
  updateStore
);

module.exports =
  router;