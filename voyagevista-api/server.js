require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongoDB, poolPromise } = require('./db'); // Destructure the exported members
const { authRoutes, contactRoutes, tripRoutes, reservationRoutes, userRoutes, tourPlanRoutes } = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectMongoDB();

// Wait for the SQL Server connection to be established
poolPromise.then(() => {
  console.log('SQL Server connection established');

  // Now that both databases are connected, set up the routes and start the server
  app.use('/api/auth', authRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/trips', tripRoutes);
  app.use('/api/reservations', reservationRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/tourplans', tourPlanRoutes);

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('SQL Server connection failed', err);
});
