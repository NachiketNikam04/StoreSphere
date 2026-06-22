const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {
  getStores,
  submitOrUpdateRating,
  myRatings
} = require("../controllers/userController");

router.use(authMiddleware);

router.use(
  roleMiddleware(
    "NORMAL_USER"
  )
);

router.get(
  "/stores",
  getStores
);

router.post(
  "/rating",
  submitOrUpdateRating
);

router.get(
  "/my-ratings",
  myRatings
);

module.exports = router;