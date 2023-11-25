require('dotenv').config();
const Reservation = require('../models/ReservationSchema'); // Replace with the actual path to the schema file
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function calculateAmount({ effectivePrice, numberOfTickets }) {
  // Calculate the base price using effectivePrice and the number of tickets
  const basePrice = effectivePrice * numberOfTickets;

  // Calculate the tax amount (e.g., 18% of the base price)
  const taxAmount = basePrice * 0.18; // 18% tax

  // Calculate the final amount by adding the tax to the base price
  const finalAmount = basePrice + taxAmount;

  // Convert to the smallest currency unit (e.g., cents for USD)
  // Stripe requires amounts to be in the smallest currency unit
  const finalAmountInCents = Math.round(finalAmount * 100);

  return finalAmountInCents;
}
exports.createCheckoutSession = async (req, res) => {
  try {
      let { effectivePrice, numberOfTickets } = req.body;

      // Convert to numbers
      effectivePrice = Number(effectivePrice);
      numberOfTickets = Number(numberOfTickets);

      // Validate that the values are numbers and not NaN
      if (isNaN(effectivePrice) || isNaN(numberOfTickets)) {
          return res.status(400).json({ error: 'Invalid effectivePrice or numberOfTickets' });
      }

      // Calculate the total amount using the effectivePrice
      const amount = calculateAmount({ effectivePrice, numberOfTickets });

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
              price_data: {
                  currency: 'usd',
                  product_data: {
                      name: 'Tour Tickets',
                      // Add other product details if necessary
                  },
                  unit_amount: amount,
              },
              quantity: 1,
          }],
          mode: 'payment',
          success_url: `${'http://localhost:8080'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${'http://localhost:8080'}/payment-cancelled`,
      });

      res.json({ id: session.id });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

  exports.verifyPayment = async (req, res) => {
    console.log('verify paymentttt');
    const { sessionId } = req.body;
    try {
      // Use the Stripe SDK to retrieve the session
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      // Verify the session's payment status
      if (session.payment_status === 'paid') {
        // Payment has been successful
        res.json({ success: true });
      } else {
        // Payment was not successful
        res.json({ success: false });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.saveReservation = async (req, res) => {
    try {
      const Trip = require('../models/TripSchema');
      // Destructure the reservation details from the request body
      const { name, email, phone, date, numberOfTickets, message, tripId } = req.body;
      console.log('save reservation called', req.body);
  
      // Check if the trip is available
      const trip = await Trip.findById(tripId);
      if (!trip) {
          return res.status(404).json({ message: 'Trip not found' });
      }

  
      if (trip.availability < numberOfTickets) {
        return res.status(400).json({ message: 'Not enough tickets available' });
      }
  
      // Create a new reservation instance
      const reservation = new Reservation({
        tripId,
        name,
        email,
        phone,
        date,
        numberOfTickets,
        message,
        status: 'pending',
      });
  
      // Update trip availability
      trip.availability -= numberOfTickets;
      await trip.save();
  
      // Save the reservation to the database
      await reservation.save();
  
      // Send a response back to the frontend
      res.status(201).json({ message: 'Reservation saved successfully', reservation });
    } catch (error) {
      // Handle errors, such as sending a response with an error message
      res.status(500).json({ message: 'Failed to save reservation', error: error.message });
    }
  };

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('tripId');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('tripId');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndRemove(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(204).json(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateReservationStatus = async (req, res) => {
    try {
      const { status } = req.body; // Get the new status from the request body
      const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
  
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      res.json(reservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  