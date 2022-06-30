const router = require('express').Router()
const Reservation = require('../models/reservation.model.js')
const { isAuthenticated } = require('../middleware/isAuthenticated')

//////Create reservation

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    console.log(req.body)
    const reservation = req.body
    const addreservation = await Reservation.create(reservation)

    res.status(201).json({
      message: 'Reservation done ',
    })
  } catch (error) {
    next(error)
  }
})

////// update the reservation

router.patch('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id
    const { date, text } = req.body
    const updatedreservation = await Reservation.findByIdAndUpdate(
      id,
      { date, text },
      {
        new: true,
      }
    )
    console.log(req.body)
    res.status(200).json(updatedreservation)
    console.log(updatedreservation)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

///// delete the reservation

router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const deletedThing = await Reservation.findByIdAndRemove(req.params.id)
    res.status(204).send(deletedThing)
  } catch (err) {
    next(err)
  }
})

////// get the reservation by ID

router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const reservationId = req.params.id
    const onereservationid = await Reservation.findById(req.params.id).populate(
      'User'
    )
    res.status(200).json(onereservationid)
  } catch (err) {
    next(err)
  }
})

////// get all reservations

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const reservations = await Reservation.find().populate('user')
    res.status(200).json(reservations)
  } catch (err) {
    next(err)
  }
})

module.exports = router
