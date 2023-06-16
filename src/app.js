const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mainRouter = require('./routes/index.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;

const server = express();
server.name = 'API'; //nombro al servidor "API", ya que trabajaremos con un endpoint de la api dogs
require('./db.js');
server.use(express.json()); //!IMPORTANTE: convierte la info a objeto json, para que se pueda leer y trabajar. ya lo hace la linea 14  15 y 16
server.use(morgan('dev'));
// Configuración de CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'https://dogs-front-end-ashy.vercel.app'],
  optionsSuccessStatus: 200,
};
server.use(cors(corsOptions));
server.use((req, res, next) => {
  //console.log("ESTOY PASANDO POR EL MIDDLEWARE"); //prueba que estamos recibiendo la request
  next();
});

server.use(mainRouter); //defino el routeo que utilizara el servidor

/*
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
*/
module.exports = server;
