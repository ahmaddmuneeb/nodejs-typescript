import mongoose from 'mongoose';

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_DB_URL);
// Mongoose connection success
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully!');
});
// Mongoose connection error
mongoose.connection.on('error', (err: any) => {
  console.error('MongoDB connection error:', err);
});
// Mongoose disconnect
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB.');
});
// Close the connection of MongoDB on server disconnect
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to application termination.');
    process.exit(0);
  } catch (err) {
    console.error('Error while closing MongoDB connection:', err);
    process.exit(1);
  }
});
