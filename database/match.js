const mongoose = require('mongoose');

exports.match = mongoose.model(
  'Match',
  new mongoose.Schema({
    team1: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      get: ([x, ...y]) => x.toUpperCase() + y.join(''),
    },
    team2: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      get: ([x, ...y]) => x.toUpperCase() + y.join(''),
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
    },
    round: {
      type: String,
      trim: true,
      unique: false,
      required: true,
    },
    game: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
      },
    ],
  }),
);
