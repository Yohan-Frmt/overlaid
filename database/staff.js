import mongoose from 'mongoose';

export default mongoose.model(
  'Staff',
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
      unique: true,
      required: false,
    },
    pronoun: {
      type: String,
      trim: true,
      unique: true,
      required: false,
    },
  }),
);
