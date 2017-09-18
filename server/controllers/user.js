const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('user get');
});

router.post('/', (req, res) => {
  res.status(201).send('user post');
});

module.exports = router;