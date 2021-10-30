import mongoose from 'mongoose';

export default mongoose.model(
  'Game',
  new mongoose.Schema({
    team1: {
      type: String,
      trim: true,
      unique: false,
      required: true,
      get: ([x, ...y]) => x.toUpperCase() + y.join(''),
    },
    team2: {
      type: String,
      trim: true,
      unique: false,
      required: true,
      get: ([x, ...y]) => x.toUpperCase() + y.join(''),
    },
    map: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Map',
    },
    scoreE1: {
      type: String,
      trim: true,
      unique: false,
      required: false,
    },
    scoreE2: {
      type: String,
      trim: true,
      unique: false,
      required: false,
    },
    number: {
      type: String,
      trim: true,
      unique: false,
      required: true,
    },
  }),
);
