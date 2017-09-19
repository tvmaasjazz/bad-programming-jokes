const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
  res.status(200).send('user get');
});

router.post('/', (req, res) => {
  db.User.create({
    username: req.body.username
  })
  .then(user => {
    console.log('created new user: ', user);
    res.status(201).send(user);
  })
  .catch(err => console.log('FAILED to create user: ', err));
});

module.exports = router;