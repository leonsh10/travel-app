require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const { authRoutes,contactRoutes,tripRoutes, reservationRoutes, userRoutes } = require('./routes');
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/user', userRoutes);
// Use other routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));