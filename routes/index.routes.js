const express = require('express')
const router = express.Router()

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
router.use('/auth', require('./user.routes'))
router.use('/reservation', require('./Reservation.routes'))
router.use('/restaurant', require('./restaurant.routes.js'))

/* GET /
It's useful to have a route which we can request to check the API is running.
Sometimes this is at /health or /check.
*/
router.get('/', (req, res, next) => res.json({ success: true }))

module.exports = router
