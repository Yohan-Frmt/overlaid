const mongoose = require('mongoose');
const { staff } = require('./staff');
const { team } = require('./team');
const { tournament } = require('./tournament');
const { match } = require('./match');
const { game } = require('./game');
const { map } = require('./map');
const { character } = require('./character');
const path = require('path');

mongoose.Promise = global.Promise;

exports.database = {
  staff,
  team,
  tournament,
  match,
  game,
  map,
  character,
  mongoose,
  initMap: () => {
    character.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new character({
          name: 'Brimstone',
          image: `/static/images/characters/Brimstone.png`,
        }).save((err) =>
          err
            ? console.error(err)
            : console.info('Character Brimstone was added'),
        );
        new character({
          name: 'Viper',
          image: `/static/images/characters/Viper.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Viper was added'),
        );
        new character({
          name: 'Omen',
          image: `/static/images/characters/Omen.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Omen was added'),
        );
        new character({
          name: 'Killjoy',
          image: `/static/images/characters/Killjoy.png`,
        }).save((err) =>
          err
            ? console.error(err)
            : console.info('Character Killjoy was added'),
        );
        new character({
          name: 'Cypher',
          image: `/static/images/characters/Cypher.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Cypher was added'),
        );
        new character({
          name: 'Sova',
          image: `/static/images/characters/Sova.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Sova was added'),
        );
        new character({
          name: 'Sage',
          image: `/static/images/characters/Sage.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Sage was added'),
        );
        new character({
          name: 'Phoenix',
          image: `/static/images/characters/Phoenix.png`,
        }).save((err) =>
          err
            ? console.error(err)
            : console.info('Character Phoenix was added'),
        );
        new character({
          name: 'Jett',
          image: `/static/images/characters/Jett.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Jett was added'),
        );
        new character({
          name: 'Reyna',
          image: `/static/images/characters/Reyna.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Reyna was added'),
        );
        new character({
          name: 'Raze',
          image: `/static/images/characters/Raze.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Raze was added'),
        );
        new character({
          name: 'Breach',
          image: `/static/images/characters/Breach.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Breach was added'),
        );
        new character({
          name: 'Skye',
          image: `/static/images/characters/Skye.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Skye was added'),
        );
        new character({
          name: 'Yoru',
          image: `/static/images/characters/Yoru.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Yoru was added'),
        );
        new character({
          name: 'Astra',
          image: `/static/images/characters/Astra.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character Astra was added'),
        );
        new character({
          name: 'KAY/O',
          image: `/static/images/characters/KAYO.png`,
        }).save((err) =>
          err ? console.error(err) : console.info('Character KAY/O was added'),
        );
        new character({
          name: 'Chamber',
          image: `/static/images/characters/Chamber.png`,
        }).save((err) =>
          err
            ? console.error(err)
            : console.info('Character Chamber was added'),
        );
      }
    });
    map.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        // ADD VALORANT MAP
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
