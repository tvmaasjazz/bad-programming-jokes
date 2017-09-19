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

        console.log('got the reaction and it does exist');

        console.log('reaction.dataValues.reactionType ', reaction.dataValues.reactionType);
        console.log('req.body.reactionType ', req.body.reactionType);
        if (reaction.dataValues.reactionType == req.body.reactionType) {
          console.log('reaction is same type so deleting');
          db.Reaction.destroy({where: {id: reaction.dataValues.id}})
          .then(() => {
            console.log('deleted reaction');
            res.sendStatus(204);
          })
          .catch(err => console.log('FAILED to delete reaction: ', err));
        } else {
          console.log('reaction is different so updating');
          db.Reaction.update(
            {reactionType: req.body.reactionType},
            {where: {id: reaction.dataValues.id}})
          .then(reaction => {
            console.log('updated reaction: ', reaction);
            res.status(201).send(reaction);
          })
          .catch(err => console.log('FAILED to update reaction: ', err));
        }
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