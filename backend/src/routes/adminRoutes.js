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

  getDashboardStats,

  createUser,

  createStore,

  getUsers,

  getStores,

  getUserById,

  getStoreOwners,

} = require(
  "../controllers/adminController"
);

router.use(
  authMiddleware
);

router.use(
  roleMiddleware(
    "ADMIN"
  )
);

router.get(
  "/dashboard",
  getDashboardStats
);

router.post(
  "/users",
  createUser
);

router.post(
  "/stores",
  createStore
);

router.get(
  "/users",
  getUsers
);

router.get(
  "/stores",
  getStores
);

router.get(
  "/store-owners",
  getStoreOwners
);

router.get(
  "/users/:id",
  getUserById
);

module.exports =
  router;