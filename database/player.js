const mongoose = require('mongoose');

exports.player = mongoose.model(
  'Player',
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
    nationality: {
      type: String,
      trim: true,
      unique: false,
      required: false,
      get: ([x, ...y]) => x.toUpperCase() + y.join(''),
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
    characters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
  }),
);
