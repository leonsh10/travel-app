const Trip = require("../models/TripSchema");
// const Reservation = require('../models/ReservationSchema');
// POST - Create a new trip
exports.createTrip = async (req, res) => {
  try {
    // Calculate effectivePrice
    const sale = req.body.sale || 0; // Default to 0 if not provided
    const price = req.body.price;
    const effectivePrice = sale ? price * (1 - sale / 100) : price;

    // Create a new trip object with effectivePrice
    const tripData = { ...req.body, effectivePrice };
    const newTrip = new Trip(tripData);

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET - Retrieve all trips
exports.getAllTrips = async (req, res) => {
  try {
    const { category, month, sort, page, limit, destination } = req.query;
    let minPrice, maxPrice;
    if (req.query.priceRange) {
      [minPrice, maxPrice] = req.query.priceRange;
    }

    let query = {};

    // Filters
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.effectivePrice = {}; // Use effectivePrice
      if (minPrice !== undefined)
        query.effectivePrice.$gte = parseInt(minPrice);
      if (maxPrice !== undefined)
        query.effectivePrice.$lte = parseInt(maxPrice);
    }
    if (category) {
      query.category = category;
    }
    const monthsMap = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    if (month) {
      const monthNumber = monthsMap[month];
      // Create a regex to search for that month in the departureTime
      const regexMonth = new RegExp(`-${monthNumber}-`);
      query.departureTime = { $regex: regexMonth, $options: "i" };
    }

    // Sorting
    let sortQuery = {};
    if (sort) {
      const [sortField, sortOrder] = sort.split("-");
      const order = sortOrder === "desc" ? -1 : 1;
      sortQuery[sortField] = order;
    }

    if (destination) {
      query.city = { $regex: destination, $options: "i" }; // Adjust the field if necessary
    }

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * pageSize;

    const trips = await Trip.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize);

    // Here you might want to also send the total count of documents to handle the pagination on the frontend
    const total = await Trip.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize);

    res.json({ trips, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Retrieve a single trip by ID
exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTripsWithReservations = async (req, res) => {
  try {
    // Use $lookup to find trips with reservations
    const tripsWithReservations = await Trip.aggregate([
      {
        $lookup: {
          from: "reservations", // Name of the reservations collection
          localField: "_id", // Field in the trips collection
          foreignField: "tripId", // Field in the reservations collection that references trips
          as: "reservations",
        },
      },
      {
        $match: {
          reservations: { $exists: true, $ne: [] }, // Filter trips with reservations
        },
      },
    ]);

    res.json(tripsWithReservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT - Update a trip
exports.updateTrip = async (req, res) => {
  try {
    if (req.body.price || req.body.sale) {
      const sale = req.body.sale || 0;
      const price =
        req.body.price || (await Trip.findById(req.params.id)).price;
      req.body.effectivePrice = sale ? price * (1 - sale / 100) : price;
    }
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
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
      return res.status(404).json({ message: "Trip not found" });
    }
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
