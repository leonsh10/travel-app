const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the auth middleware

// Apply the auth middleware to protect this route
router.get('/all-reservations/:id', authMiddleware, userController.getUserReservations);

module.exports = router;