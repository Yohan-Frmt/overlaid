const { database } = require('../database');
const { character } = require('../database/character');
const { staff } = require('../database/staff');

module.exports = (router) => {
  router.use('/dashboard', router);

  router.get('/', async (req, res, next) => {
    res.status(200).render('dashboard');
  });

  router.get('/player', async (req, res, next) => {
    const players = await database.player.find({});
    const characters = await database.character.find({});
    const teams = await database.team.find({});
    res.status(200).render('player', { players, characters, teams });
  });

  router.get('/player/:name', async (req, res, next) => {
    const player = await database.player
      .findOne({ name: req.params.name })
      .populate([
        { path: 'characters', select: '-__v' },
        { path: 'teams', select: 'name' },
      ]);
    res.status(200).render('playerShow', { player });
  });

  router.post('/player', async (req, res, next) => {
    console.info(req.body);
    await database
      .createPlayer({
        name: req.body.name[0].toUpperCase() + req.body.name.slice(1),
        twitter: req.body.twitter || null,
        nationality: req.body.nationality,
      })
      .then(async (player) => {
        const team = await database.team
          .findOne({ name: req.body.team })
          .exec();
        await database.joinPlayerAndTeam(team.id, player.id);
        if (req.body.characters.split(',')) {
          for (const characterName of req.body.characters.split(',')) {
            const character = await database.character
              .findOne({ name: characterName })
              .exec();
            await database.addCharacterToPlayer(player.id, character.id);
          }
        }
        player = await database.player
          .findOne({ name: player.name })
          .populate([
            { path: 'characters', select: '-__v' },
            { path: 'teams', select: 'name' },
          ])
          .exec();
        res.status(200).json({
          status: true,
          data: {
            name: player.name,
            twitter: player.twitter,
            nationality: player.nationality,
            team: player.teams,
            characters: player.characters,
            message: `Player ${req.body.name} was added`,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ status: false });
      });
  });

  router.delete('/player', async (req, res, next) => {
    database.player.deleteOne({ name: req.body.name }, {}, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json({ status: false });
      } else {
        console.info(`Player ${req.body.name} was deleted`);
        res.status(200).json({
          status: true,
          data: {
            name: req.body.name,
            message: `Player ${req.body.name} was deleted`,
          },
        });
      }
    });
  });

  router.get('/valorant', async (req, res, next) => {
    const maps = await database.map.find({});
    const characters = await database.character.find({});
    res.status(200).render('valorant', { maps, characters });
  });

  router.post('/valorant', async (req, res, next) => {
    switch (req.body.type) {
      case 'character':
        const image = req.files.image;
        await new character({
          name: req.body.name,
          image: `/static/images/characters/${req.body.name}.${
            image.name.split('.')[1]
          }`,
        }).save(async (err) => {
          if (err) {
            console.error(err);
            res.status(400).json({ status: false });
          } else {
            await image.mv(
              `./public/images/characters/${req.body.name}.${
                image.name.split('.')[1]
              }`,
            );
            console.info(`Character ${req.body.name} was added`);
            res.status(200).json({
              status: true,
              data: {
                name: req.body.name,
                image: `/static/images/characters/${req.body.name}.${
                  image.name.split('.')[1]
                }`,
                message: `Character ${req.body.name} was added`,
              },
            });
          }
        });
        break;
    }
  });

  router.get('/team', async (req, res, next) => {
    const teams = await database.team.find({});
    const players = await database.player.find({});
    res.status(200).render('team', { teams, players });
  });

  router.get('/team/:name', async (req, res, next) => {
    const team = await database.team
      .findOne({ name: req.params.name })
      .populate('players');
    res.status(200).render('teamShow', { team });
  });

  router.post('/team', async (req, res, next) => {
    const logo = req.files.logo;
    await database
      .createTeam({
        name: req.body.name[0].toUpperCase() + req.body.name.slice(1),
        twitter: req.body.twitter || null,
        nationality: req.body.nationality,
        logo: logo
          ? `/static/images/teams/${req.body.name}.${logo.name.split('.')[1]}`
          : null,
      })
      .then(async (team) => {
        if (!req.body.players.split(',')) {
          for (const playerName of req.body.players.split(',')) {
            const player = await database.player
              .findOne({ name: playerName })
              .exec();
            await database.joinPlayerAndTeam(team.id, player.id);
          }
        }
        await logo.mv(
          `./public/images/teams/${req.body.name}.${logo.name.split('.')[1]}`,
        );
        res.status(200).json({
          status: true,
          data: {
            name: team.name,
            twitter: team.twitter,
            nationality: team.nationality,
            logo: team.logo,
            message: `Team ${req.body.name} was added`,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ status: false });
      });
  });

  router.delete('/team', async (req, res, next) => {
    database.team.deleteOne({ name: req.body.name }, {}, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json({ status: false });
      } else {
        console.info(`Team ${req.body.name} was deleted`);
        res.status(200).json({
          status: true,
          data: {
            name: req.body.name,
            message: `Team ${req.body.name} was deleted`,
          },
        });
      }
    });
  });

  router.get('/staff', async (req, res, next) => {
    const staffs = await database.staff.find({});
    res.status(200).render('staff', { staffs });
  });

  router.delete('/staff', (req, res, next) => {
    database.staff.deleteOne(
      { name: req.body.name.toLowerCase() },
      {},
      (err) => {
        if (err) {
          console.error(err);
          res.status(400).json({ status: false });
        } else {
          console.info(`Staff ${req.body.name} was deleted`);
          res.status(200).json({
            status: true,
            data: {
              name: req.body.name,
              message: `Staff ${req.body.name} was deleted`,
            },
          });
        }
      },
    );
  });

  router.post('/staff', async (req, res, next) => {
    await new staff({
      name: req.body.name,
      twitter: req.body.twitter || '',
      pronoun: req.body.pronoun || '',
    }).save(async (err) => {
      if (err) {
        console.error(err);
        res.status(400).json({ status: false });
      } else {
        console.info(`Staff ${req.body.name} was added`);
        res.status(200).json({
          status: true,
          data: {
            name: req.body.name,
            twitter: req.body.twitter,
            pronoun: req.body.pronoun,
            message: `Staff ${req.body.name} was added`,
          },
        });
      }
    });
  });
};
