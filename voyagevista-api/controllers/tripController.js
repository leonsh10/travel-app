const Trip = require('../models/TripSchema');

// POST - Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET - Retrieve all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Retrieve a single trip by ID
exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT - Update a trip
exports.updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(updatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Delete a trip
exports.deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
