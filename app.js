
require('dotenv').config();

const Server = require('./models/server');



// haremos la instancia de la clse
const server = new Server();
server.listen();