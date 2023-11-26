const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/all-reservations/:id', userController.getUserReservations);

module.exports = router;