const router = require('express').Router()
const Reservation = require('../models/Reservation.model.js')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const UserModel = require('../models/User.model.js')

//////Create reservation

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    ///console.log(req.body)

    const { date, text, restaurant, numberOfGuests } = req.body
    const user = await UserModel.findOne({ username: req.payload.username })
    const reservation = await Reservation.create({
      restaurant,
      numberOfGuests,
      text,
      date,
      user: user._id,
    })

    console.log('after create', typeof reservation.date)

    res.status(201).json(reservation)
  } catch (error) {
    next(error)
  }
})

////// update the reservation

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    console.log(id)
    const { numberOfGuests, date, text } = req.body
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { date, text, numberOfGuests },
      {
        new: true,
      }
    )
    ///console.log(req.body)
    res.status(200).json(updatedReservation)
    ///console.log(updatedreservation)
  } catch (error) {
    ///console.log(error)
    next(error)
  }
})

///// delete the reservation

router.delete('/:id', async (req, res, next) => {
  try {
    console.log(req.params.id)
    const deletedThing = await Reservation.findByIdAndRemove(req.params.id)

    res.status(200).json({ message: 'Reservation deleted' })
    console.log(deletedThing)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

////// get the reservation by ID

router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const reservationId = req.params.id
    const onereservationid = await Reservation.findById(req.params.id).populate(
      'user'
    )
    res.status(200).json(onereservationid)
  } catch (err) {
    next(err)
  }
})

////// get all reservations

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const reservations = await Reservation.find({
      user: req.payload._id,
    }).populate('user restaurant', '-_id name')
    res.status(200).json(reservations)
  } catch (err) {
    next(err)
  }
})

module.exports = router
