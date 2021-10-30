import mongoose from 'mongoose';
import staff from './staff.js';
import team from './team.js';
import tournament from './tournament.js';
import match from './match.js';
import game from './game.js';
import map from './map.js';

mongoose.Promise = global.Promise;

export default {
  staff,
  team,
  tournament,
  match,
  game,
  map,
  mongoose,
  initMap: () => {
    map.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new map({
          name: 'Bind',
          image:
            'https://cdnportal.mobalytics.gg/production/2020/04/bind_map_callouts.jpg',
        }).save((err) =>
          err ? console.error(err) : console.info('Map Bind was added'),
        );
        new map({
          name: 'Heaven',
          image:
            'https://cdnportal.mobalytics.gg/production/2020/04/haven_callouts.jpg',
        }).save((err) =>
          err ? console.error(err) : console.info('Map Heaven was added'),
        );
        new map({
          name: 'Split',
          image:
            'https://cdnportal.mobalytics.gg/production/2020/04/split_callouts.jpg',
        }).save((err) =>
          err ? console.error(err) : console.info('Map Split was added'),
        );
        new map({
          name: 'Ascent',
          image: 'https://mobalytics.gg/wp-content/uploads/2020/04/ascent.jpg',
        }).save((err) =>
          err ? console.error(err) : console.info('Map Ascent was added'),
        );
        new map({
          name: 'Icebox',
          image:
            'https://storage.googleapis.com/usc-main-portal/production/2020/06/709cca30-icebox_callouts.jpg',
        }).save((err) =>
          err ? console.error(err) : console.info('Map Icebox was added'),
        );
        new map({
          name: 'Breeze',
          image:
            'https://cdnportal.mobalytics.gg/production/2021/05/ea82cc2d-valorant-breeze-map-article-version.jpg',
        }).save((err) =>
          err ? console.error(err) : console.info('Map Breeze was added'),
        );
        new map({
          name: 'Fracture',
          image:
            'https://cdnportal.mobalytics.gg/production/2021/09/7fdd8774-fracture-mobalytics-map.png',
        }).save((err) =>
          err ? console.error(err) : console.info('Map Fracture was added'),
        );
      }
    });
  },
};
