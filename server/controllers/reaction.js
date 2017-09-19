const router = require('express').Router();
const db = require('../db');

// router.get('/', (req, res) => {
//   res.status(200).send('reaction get');
// });

//
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
        db.Reaction.update({
          where: {id: reaction.dataValues.id},
          values: {reactionType:}
        })
        .then(reaction => {
          console.log('updated reaction: ', reaction));
          res.status(201).send(reaction);
        })
        .catch(err => console.log('FAILED to update reaction: ', err));
      } else {
        db.Reaction.create({
          reactionType: req.body.reactionType,
          userId: user.dataValues.id,
          jokeId: req.body.jokeId
        })
        .then(reaction => {
          console.log('created new reation: ', reaction);
          res.status(201).send(reaction);
        })
        .catch(err => console.log('FAILED to create reaction: ', err));
      }
    })
    .catch(err => console.log('ERROR trying to find reaction: ', err));
  })
  .catch(err => console.log('FAILED to find user: ', err));
});

module.exports = router;