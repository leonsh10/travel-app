const Trip = require("../models/TripSchema");
exports.createTrip = async (req, res) => {
  try {
    const sale = req.body.sale || 0;
    const price = req.body.price;
    const effectivePrice = sale ? price * (1 - sale / 100) : price;

    const tripData = { ...req.body, effectivePrice };
    const newTrip = new Trip(tripData);

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    const { category, month, sort, page, limit, destination } = req.query;
    let minPrice, maxPrice;
    if (req.query.priceRange) {
      [minPrice, maxPrice] = req.query.priceRange;
    }

    let query = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.effectivePrice = {}; 
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
      const regexMonth = new RegExp(`-${monthNumber}-`);
      query.departureTime = { $regex: regexMonth, $options: "i" };
    }

    let sortQuery = {};
    if (sort) {
      const [sortField, sortOrder] = sort.split("-");
      const order = sortOrder === "desc" ? -1 : 1;
      sortQuery[sortField] = order;
    }

    if (destination) {
      query.city = { $regex: destination, $options: "i" };
    }

    const pageNum = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * pageSize;

    const trips = await Trip.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize);

    const total = await Trip.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize);

    res.json({ trips, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    const tripsWithReservations = await Trip.aggregate([
      {
        $lookup: {
          from: "reservations", 
          localField: "_id", 
          foreignField: "tripId",
          as: "reservations",
        },
      },
      {
        $match: {
          reservations: { $exists: true, $ne: [] },
        },
      },
    ]);

    res.json(tripsWithReservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
