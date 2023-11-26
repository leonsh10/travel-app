const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/all-reservations/:id', authMiddleware, userController.getUserReservations);

module.exports = router;