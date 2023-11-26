const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Trip", 
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String, 
    date: { type: Date, required: true },
    numberOfTickets: { type: Number, required: true },
    message: String, 
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"], 
      default: "pending",
    },
  },
  { timestamps: true }
); 

module.exports = mongoose.model("Reservation", reservationSchema);
