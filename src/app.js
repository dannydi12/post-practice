/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const { NODE_ENV } = require('../config');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' }),
  ],
});
if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
app.use((error, _req, res, _next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = {
      error: {
        message: 'server error',
      },
    };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).send(response);
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Got, world!');
});

app.post('/user', (req, res) => {
  const {
    username, password, favoriteClub, newsLetter,
  } = req.body;
});

module.exports = app;
