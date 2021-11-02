const mongoose = require('mongoose');

exports.tournament = mongoose.model(
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
    twitter: {
      type: String,
      trim: true,
      unique: false,
      required: false,
    },
    logo: {
      type: String,
      trim: true,
      unique: false,
      required: false,
    },
  }),
);
