import mongoose from 'mongoose';

const dbName = process.env.NODE_ENV === 'development' ? 'DevDB' : 'TestDB';

const connString = `mongodb+srv://francescorjm:i9flIOeTrFjZi4zi@appcluster.eilenly.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(connString)
  .then(() => {
    console.log(`Connected to ${dbName}!`);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
