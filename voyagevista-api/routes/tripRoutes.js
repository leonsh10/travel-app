const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.post('/submit', tripController.createTrip);
router.get('/all', tripController.getAllTrips);
router.get('/singletrip/:id', tripController.getTrip);
router.put('/update/:id', tripController.updateTrip);
router.delete('/delete/:id', tripController.deleteTrip);

module.exports = router;