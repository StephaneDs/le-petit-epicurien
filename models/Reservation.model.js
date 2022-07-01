const { Schema, model, SchemaTypes } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const reservationSchema = new Schema(
  {
    text: {
      type: String,
    },

    ////// having the reference to the user model
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    /////having the reference to the resturant model
    resturant: {
      type: SchemaTypes.ObjectId,
      ref: "Resturant",
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const reservation = model("Reservation", reservationSchema)

module.exports = reservation
