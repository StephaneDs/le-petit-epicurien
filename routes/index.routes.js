const router = require("express").Router();
const reservationRoutes = require("./reservation.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
router.use("/reservation", reservationRoutes);
module.exports = router;
