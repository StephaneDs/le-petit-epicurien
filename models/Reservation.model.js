const { Schema, model, SchemaTypes } = require('mongoose')

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const reservationSchema = new Schema(
  {
    text: {
      type: String,
    },

    ////// having the reference to the user model
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    /////having the reference to the restaurant model
    restaurant: {
      type: SchemaTypes.ObjectId,
      ref: 'restaurant',
      required: true,
    },
    date: {
      type: SchemaTypes.Date,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const reservation = model('Reservation', reservationSchema)

module.exports = reservation
