const { model, Schema, schemaTypes, default: mongoose } = require("mongoose")

const restaurantSchema = new Schema({
  idRestaurant: {
    name: String,
    image: [string],
  },

  category: {
    cuisine: String,
  },

  localisation: {
    adress: {
      street_name: String,
      street_number: Number,
      city: String,
      country: String,
      arrondissement: String,
    },

    daysOfWeek: {
      monday: Boolean,
      tuesday: Boolean,
      wednesday: Boolean,
      thursday: Boolean,
      friday: Boolean,
      saturday: Boolean,
      sunday: Boolean,
    },

    operating_hours: [[Date, Date]],
  },
})

const Restaurant = model("restaurants", restaurantSchema)
module.exports = Restaurant
