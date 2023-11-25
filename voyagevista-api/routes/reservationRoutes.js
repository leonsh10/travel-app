const express = require('express');
const router = express.Router();
const reservationController  = require('../controllers/ReservationController');

// POST request to create a new reservation
router.post('/create-checkout-session', reservationController.createCheckoutSession);

router.post('/save', reservationController.saveReservation);

router.post('/verify-payment', reservationController.verifyPayment);

// GET request to retrieve all reservations
router.get('/all', reservationController.getAllReservations);

// GET request to retrieve a specific reservation by ID
router.get('/:id', reservationController.getReservationById);

// PUT request to update a specific reservation by ID
router.put('/update/:id', reservationController.updateReservation);

// PUT request to update a specific reservation by ID
router.put('/update-status/:id', reservationController.updateReservationStatus);

// DELETE request to delete a specific reservation by ID
router.delete('/delete/:id', reservationController.deleteReservation);

module.exports = router;