const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
  const category = req.query.category || 'id';
  const order = req.query.order || 'DESC';
  const options = {
    include: [db.User],
    order: [[category, order]],
    limit: 100
  };
  
  db.Joke.findAll(options)
    .then(jokes => {
      res.status(200).send(jokes);
    });
});

router.post('/', (req, res) => {
  db.User.findOne({
    where: {username: req.body.username}
  })
  .then(user => {
    db.Joke.create({
      text: req.body.text,
      userId: user.dataValues.id
    })
    .then(joke => {
      res.status(201).send(joke);
    })
    .catch(err => console.log('FAILED to create joke: ', err));
  })
  .catch(err => console.log('FAILED to find user: ', err));
});

router.delete('/', (req, res) => {
  db.Joke.destroy({where: {id: req.body.id}})
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log('FAILED to delete joke: ', err);
      res.status(400).send('failed to delete');
    });
});

module.exports = router;