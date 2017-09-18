const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('reaction get');
});

router.post('/', (req, res) => {
  res.status(201).send('reaction post');
});

module.exports = router;