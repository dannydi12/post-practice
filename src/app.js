require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('../config');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use((error, req, res, next) => {
  if (NODE_ENV === 'production') {
    response = {
      error: {
        message: 'server error'
      }
    };
  }
  else {
    console.log(error);
    response = { message: error.message, error };
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Got, world!');
});

app.post('/user', (req, res) => {
  const { username, password, favoriteClub, newsLetter } = req.body;
});

module.exports = app;