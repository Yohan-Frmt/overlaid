import mongoose from 'mongoose';

export default mongoose.model(
  'Tournament',
  new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      get: ([x, ...y]) => x.toUpperCase() + y.join(''),
    },
    bracket: {
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
