require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectMongoDB, poolPromise } = require('./db');
const { authRoutes, contactRoutes, tripRoutes, reservationRoutes, userRoutes, tourPlanRoutes } = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

connectMongoDB();

poolPromise.then(() => {
  console.log('SQL Server connection established');

  app.use('/api/auth', authRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/trips', tripRoutes);
  app.use('/api/reservation', reservationRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/tourplans', tourPlanRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('SQL Server connection failed', err);
});
