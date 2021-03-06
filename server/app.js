require('dotenv').config();
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

//MIDDLEWARE
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));
app.use(cors());

//userRoutes
const userRoutes = require('./controllers/user.js');
app.use('/user', userRoutes);

const jokeRoutes = require('./controllers/joke.js');
app.use('/joke', jokeRoutes);

const reactionRoutes = require('./controllers/reaction.js');
app.use('/reaction', reactionRoutes);

//static
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.listen(process.env.PORT, err => {
  if (err) {
    return console.log('Could not start server: ', err);
  }

  console.log('Bad Programming Jokes connected at ' + process.env.PORT);
});  
