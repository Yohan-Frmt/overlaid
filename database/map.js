const mongoose = require('mongoose');

exports.map = mongoose.model(
  'Map',
  new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      get: ([x, ...y]) => x.toUpperCase() + y.join(''),
    },
    image: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
  }),
);
