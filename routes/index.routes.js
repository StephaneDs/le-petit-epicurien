const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
router.use("/auth", require("./user.routes"));
router.use("/reservation", require("./Reservation.routes"));
module.exports = router;
