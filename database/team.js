import mongoose from 'mongoose';

export default mongoose.model(
  'Team',
  new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      get: ([x, ...y]) => x.toUpperCase() + y.join(''),
    },
    twitter: {
      type: String,
      trim: true,
      unique: false,
      required: false,
    },
    nationality: {
      type: String,
      trim: true,
      unique: false,
      required: true,
      get: ([x, ...y]) => x.toUpperCase() + y.join(''),
    },
    logo: {
      type: String,
      trim: true,
      unique: false,
      required: false,
    },
  }),
);
