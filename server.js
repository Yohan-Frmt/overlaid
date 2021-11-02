const hbs = require('hbs');
const cors = require('cors');
const fu = require('express-fileupload');
const { socket } = require('./socket');
const path = require('path');
const { config } = require('./config');
const { database } = require('./database');
const cookieParser = require('cookie-parser');
const express = require('express');
const http = require('http');
const app = express();
const router = new express.Router();
const server = new http.Server(app);

database.mongoose
  .connect(
    `${config.DATABASE_URI}?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`,
  )
  .then(() => {
    database.initMap();
    console.log('Connected to Mongo Database');
  })
  .catch((e) => {
    console.error(`Error while connecting to Mongo Database : ${e}`);
    throw e;
  });

socket(server);
app.use(
  fu({
    createParentPath: true,
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use('/', router);
require(`${__dirname}/routes/dashboard`)(router);
app.get('/', (req, res) => {
  res.status(418).render('index');
});
app.listen(config.API_PORT, () => {
  console.info(`Overlaid Api listening on port ${config.API_PORT}!`);
});

server.listen(Number(config.SOCKET_PORT), () => {
  console.info(
    `Overlaid Socket listening on port ${Number(config.SOCKET_PORT)}!`,
  );
  console.info(`Api and Overlaid whitelisted for ${config.ALLOW_HOSTS_LIST}`);
});
