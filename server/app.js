require('dotenv').config();
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

const app = express();

//MIDDLEWARE
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));

//userRoutes
const userRoutes = require('./controllers/user.js');
app.use('/user', userRoutes);

const jokeRoutes = require('./controllers/joke.js');
app.use('/joke', jokeRoutes);

const reactionRoutes = require('./controllers/reaction.js');
app.use('/reaction', reactionRoutes);

//DATABASE/SERVER
app.listen(process.env.PORT, err => {
  if (err) {
    console.log('Could not start server: ', err);
  } else {
    console.log('Bad Programming Jokes connected at ' + process.env.PORT);
  }
});