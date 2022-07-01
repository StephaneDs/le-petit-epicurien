const { model, Schema, schemaTypes, default: mongoose } = require('mongoose')

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  image: String,
  cuisine: String,
  localisation: {
    address: {
      street_name: String,
      city: String,
      country: String,
      postalCode: Number,
    },
  },
  priceRange: Number,

  daysOfWeek: {
    monday: [{ start: Date, end: Date }],
    tuesday: [{ start: Date, end: Date }],
    wednesday: [{ start: Date, end: Date }],
    thursday: [{ start: Date, end: Date }],
    friday: [{ start: Date, end: Date }],
    saturday: [{ start: Date, end: Date }],
    sunday: [{ start: Date, end: Date }],
  },
})

const Restaurant = model('restaurants', restaurantSchema)
module.exports = Restaurant
