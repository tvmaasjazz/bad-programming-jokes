const router = require('express').Router();
const db = require('../db');

// router.get('/', (req, res) => {
//   res.status(200).send('reaction get');
// });

router.post('/', (req, res) => {
  db.User.findOne({where: {username: req.body.username}})
  .then(user => {
    db.Reaction.findOne({
      where: {
        userId: user.dataValues.id,
        jokeId: req.body.jokeId
      }
    })
    .then(reaction => {
      if (reaction) {
        if (reaction.dataValues.reactionType == req.body.reactionType) {
          deleteReaction(req, res, reaction);
        } else {
          updateReaction(req, res, reaction);
        }
      } else {
        createReaction(req, res, reaction, user);
      }
    })
    .catch(err => console.log('ERROR trying to find reaction: ', err));
  })
  .catch(err => console.log('FAILED to find user: ', err));
});

function deleteReaction(req, res, reaction) {
    db.Reaction.destroy({where: {id: reaction.dataValues.id}})
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => console.log('FAILED to delete reaction: ', err));
}

function updateReaction(req, res, reaction) {
  db.Reaction.update(
    {reactionType: req.body.reactionType},
    {where: {id: reaction.dataValues.id}})
  .then(reaction => {
    res.sendStatus(204);
  })
  .catch(err => console.log('FAILED to update reaction: ', err));
}

function createReaction(req, res, reaction, user) {
  db.Reaction.create({
    reactionType: req.body.reactionType,
    userId: user.dataValues.id,
    jokeId: req.body.jokeId
  })
  .then(reaction => {
    console.log('created new reaction: ', reaction);
    res.status(201).send(reaction);
  })
  .catch(err => console.log('FAILED to create reaction: ', err));
}

module.exports = router;