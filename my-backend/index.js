import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';  // Import from config.js
import booksRoute from './routes/booksRoute.js';
import authRoute from './routes/authRoutes.js';
import addToCartRoute from './routes/addToCartRoute.js'


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/books', booksRoute);
app.use('/auth', authRoute);
app.use('/cart',addToCartRoute)

// Debugging log
console.log('PORT:', PORT);
console.log('MongoDB URL:', mongoDBURL);

// Connect to MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

app.get('/', (req, res) => {
  return res.status(200).send('Welcome to the MERN Stack Tutorial');
});
