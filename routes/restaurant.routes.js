const express = require("express")
const router = express.Router()
const { default: mongoose } = require("mongoose")

// require the restaurant model
const Restaurant = require("../models/Restaurant.model")

// List of all the restaurants
router.get("/restaurants", async (req, res, next) => {
  try {
    const allRestaurant = await Restaurant.find()
    res.status(200).json(allRestaurant)
  } catch (err) {
    next(err)
  }
})

// Add a new restaurant
router.post("/restaurants", async (req, res, next) => {
  try {
    const createNew = await Restaurant.create(req.body)
    res.status(201).json(newRestaurantCreated)
  } catch (err) {
    res.status(400).json("restaurant not created")
  }
})

//  Update a restaurant
router.patch("/restaurants/:id", async (req, res, next) => {
  try {
    const restsaurantId = req.params.id
    const updateRestaurant = await droneModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json(updatedRestaurant)
  } catch (err) {
    next(err)
  }
})

// Delete the restaurant
router.delete("/restaurants/:id", async (req, res, next) => {
  try {
    const deletedrestaurant = await Drone.findByIdAndDelete(req.params.id)
    res.json({ message: `you deleted ${deletedRestaurant}` })
  } catch (err) {
    next(err)
  }
})

module.exports = router
