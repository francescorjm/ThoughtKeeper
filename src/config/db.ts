import mongoose from 'mongoose';

const connString =
  'mongodb+srv://francescorjm:i9flIOeTrFjZi4zi@appcluster.eilenly.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(connString)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
