const socketio = require('socket.io');
const { config } = require('./config');

const getUniqueId = () => {
  const s = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s() + s() + '-' + s();
};

const fixCors = (hosts) => {
  const isPortPresent = /(https?:\/\/.*):(\d*)\/?(.*)/g;
  return hosts.map((host) => {
    if (host.includes('https:') && host.match(isPortPresent) == null)
      return `${host}:443`;
    if (host.includes('http:') && host.match(isPortPresent) == null)
      return `${host}:80`;
    return host;
  });
};

exports.socket = (server) => {
  const io = new socketio.Server(server, {
    cors: fixCors(config.ALLOW_HOSTS_LIST),
    transports: ['websocket', 'polling'],
  });
  console.info('SocketIO initialised !');
  const clients = {};
  io.on('connect', async (socket) => {
    const uid = getUniqueId();
    clients[uid] = socket;
    console.info(`Connected: ${uid} in ${Object.getOwnPropertyNames(clients)}`);
    socket.on('disconnect', async () => {
      console.info(`${new Date()} Peer ${uid} disconnected.`);
      delete clients[uid];
    });
  });
};
