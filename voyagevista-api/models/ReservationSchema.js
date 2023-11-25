const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Trip", // assuming 'Trip' is your Trip model name
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String, // optional field
    date: { type: Date, required: true },
    numberOfTickets: { type: Number, required: true },
    message: String, // optional field
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"], // Enum to ensure only valid statuses are set
      default: "pending",
    },
  },
  { timestamps: true }
); // Add created and updated timestamps

module.exports = mongoose.model("Reservation", reservationSchema);
