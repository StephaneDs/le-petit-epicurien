const express = require('express')
const router = express.Router()
const { default: mongoose } = require('mongoose')
const { isAuthenticated } = require('../middleware/isAuthenticated')

// require the restaurant model
const Restaurant = require('../models/Restaurant.model')

// List of all the restaurants
router.get('/restaurants', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 30
    if (limit > 30) {
      limit = 30
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const name = req.query.name

    const filter = {}
    if (name) {
      filter.name = name
    }

    const totalDocumentCount = await Restaurant.countDocuments(filter)

    const next =
      endIndex < totalDocumentCount
        ? {
            page: page + 1,
            limit: limit,
          }
        : null

    const previous =
      startIndex > 0
        ? {
            page: page - 1,
            limit: limit,
          }
        : null

    const results = await Restaurant.find(filter).limit(limit).skip(startIndex)

    res.status(200).json({ next, previous, totalDocumentCount, results })
  } catch (err) {
    next(err)
  }
})

// Add a new restaurant
router.post('/restaurants', async (req, res, next) => {
  try {
    console.log(req.body)
    const createNew = await Restaurant.create(req.body)

    res.status(201).json(createNew)
  } catch (err) {
    console.error(err)
    res.status(400).json('restaurant not created')
  }
})

//  Update a restaurant
router.patch('/restaurants/:id', async (req, res, next) => {
  try {
    const restaurantId = req.params.id
    const updateRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json(updateRestaurant)
  } catch (err) {
    next(err)
  }
})

// Delete the restaurant
router.delete('/restaurants/:id', async (req, res, next) => {
  try {
    const deletedrestaurant = await Restaurant.findByIdAndDelete(req.params.id)
    res.json({ message: `you deleted ${deletedrestaurant}` })
  } catch (err) {
    next(err)
  }
})

//GET all restaurants by Id
router.get('/:id', async (req, res, next) => {
  try {
    const restaurantId = req.params.id
    const oneRestaurantid = await Restaurant.findById(req.params.id)
    res.status(200).json(oneRestaurantid)
  } catch (err) {
    next(err)
  }
})

module.exports = router
