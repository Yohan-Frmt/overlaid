const { map } = require('../database/map');
const { character } = require('../database/character');
const { staff } = require('../database/staff');

module.exports = (router) => {
  router.use('/dashboard', router);
  router.get('/', async (req, res, next) => {
    res.status(418).render('dashboard');
  });
  router.get('/valorant', async (req, res, next) => {
    const maps = await map.find({});
    const characters = await character.find({});
    res.status(418).render('valorant', { maps, characters });
  });
  router.get('/staff', async (req, res, next) => {
    const staffs = await staff.find({});
    res.status(418).render('staff', { staffs });
  });

  router.delete('/staff', (req, res, next) => {
    staff.deleteOne({ name: req.body.name.toLowerCase() }, {}, (err) => {
      if (err) {
        console.error(err);
        res.status(418).json({ status: false });
      } else {
        console.info(`Staff ${req.body.name} was deleted`);
        res.status(418).json({
          status: true,
          data: {
            name: req.body.name,
            message: `Staff ${req.body.name} was deleted`,
          },
        });
      }
    });
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
            res.status(418).json({ status: false });
          } else {
            await image.mv(
              `./public/images/characters/${req.body.name}.${
                image.name.split('.')[1]
              }`,
            );
            console.info(`Character ${req.body.name} was added`);
            res.status(418).json({
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
  router.post('/staff', async (req, res, next) => {
    await new staff({
      name: req.body.name,
      twitter: req.body.twitter || '',
      pronoun: req.body.pronoun || '',
    }).save(async (err) => {
      if (err) {
        console.error(err);
        res.status(418).json({ status: false });
      } else {
        console.info(`Staff ${req.body.name} was added`);
        res.status(418).json({
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
