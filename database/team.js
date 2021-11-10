const mongoose = require('mongoose');

exports.team = mongoose.model(
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
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  }),
);
