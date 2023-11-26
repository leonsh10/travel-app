const express = require('express');
const router = express.Router();
const reservationController  = require('../controllers/ReservationController');

router.post('/create-checkout-session', reservationController.createCheckoutSession);

router.post('/save', reservationController.saveReservation);

router.post('/verify-payment', reservationController.verifyPayment);

router.get('/all', reservationController.getAllReservations);

router.get('/:id', reservationController.getReservationById);

router.put('/update/:id', reservationController.updateReservation);

router.put('/update-status/:id', reservationController.updateReservationStatus);

router.delete('/delete/:id', reservationController.deleteReservation);

module.exports = router;