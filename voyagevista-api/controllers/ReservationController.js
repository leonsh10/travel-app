require('dotenv').config();
const Reservation = require('../models/ReservationSchema');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function calculateAmount({ effectivePrice, numberOfTickets }) {
  const basePrice = effectivePrice * numberOfTickets;

  const taxAmount = basePrice * 0.18;

  const finalAmount = basePrice + taxAmount;
  const finalAmountInCents = Math.round(finalAmount * 100);

  return finalAmountInCents;
}
exports.createCheckoutSession = async (req, res) => {
  try {
      let { effectivePrice, numberOfTickets } = req.body;

      effectivePrice = Number(effectivePrice);
      numberOfTickets = Number(numberOfTickets);

      if (isNaN(effectivePrice) || isNaN(numberOfTickets)) {
          return res.status(400).json({ error: 'Invalid effectivePrice or numberOfTickets' });
      }

      const amount = calculateAmount({ effectivePrice, numberOfTickets });

      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
              price_data: {
                  currency: 'usd',
                  product_data: {
                      name: 'Tour Tickets',
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
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      if (session.payment_status === 'paid') {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.saveReservation = async (req, res) => {
    try {
      const Trip = require('../models/TripSchema');
      const { name, email, phone, date, numberOfTickets, message, tripId } = req.body;
      console.log('save reservation called', req.body);
  
      const trip = await Trip.findById(tripId);
      if (!trip) {
          return res.status(404).json({ message: 'Trip not found' });
      }

  
      if (trip.availability < numberOfTickets) {
        return res.status(400).json({ message: 'Not enough tickets available' });
      }
  
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
  
      trip.availability -= numberOfTickets;
      await trip.save();
  
      await reservation.save();
      res.status(201).json({ message: 'Reservation saved successfully', reservation });
    } catch (error) {
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
    res.status(204).json(); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateReservationStatus = async (req, res) => {
    try {
      const { status } = req.body; 
      const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
  
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      res.json(reservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  