const Reservation = require('../models/ReservationSchema');

exports.getUserReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ email: req.params.id }).populate('tripId');
  
        res.json({ reservations });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};