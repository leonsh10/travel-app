const Reservation = require('../models/ReservationSchema');

// Function to get reservations for a user
exports.getUserReservations = async (req, res) => {
    try {
        // Use populate to retrieve the associated trip object
        const reservations = await Reservation.find({ email: req.params.id }).populate('tripId');
  
        res.json({ reservations });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};