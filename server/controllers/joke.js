const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('joke get');
});

router.post('/', (req, res) => {
  res.status(201).send('joke post');
});

module.exports = router;