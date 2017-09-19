const db = require('./index.js');

//delete everything first 
function destroyAll(callback) {
  db.Reaction.destroy({where: {}})
    .then(() => {
      db.Joke.destroy({where: {}})
        .then(() => {
          db.User.destroy({where: {}})
            .then(() => callback())
            .catch(err => callback(err));
        })
        .catch(err => callback(err));
    })
    .catch(err => callback(err));
} 

function seed(callback) {
  db.User.create({username: 'dAAtAAmAAs'})
  .then(() => {
    db.User.create({username: 'Steve Jobs'})
    .then(() => {
      db.Joke.create({
        text: 'I AM DAATAAMAAS',
        userId: 1
      })
      .then(() => {
        db.Joke.create({
          text: 'Bill Gates? More like Bill Hates himself for not thinking to make a smart phone',
          userId: 2
        })
        .then(() => {
          db.Reaction.create({
            reactionType: 3,
            userId: 2,
            jokeId: 1
          })
          .then(() => {
            db.Reaction.create({
              reactionType: 2,
              userId: 1,
              jokeId: 2
            })
            .then(() => callback());
          });
        });
      });
    });
  })
  .catch(err => callback(err));
}


destroyAll(err => {
  if (err) {
    return console.log('FAILED to destroy all db tables: ', err);
  }

  seed(err => {
    if (err) {
      return console.log('FAILED to seed db: ', err);
    }

    console.log('Successfully dropped and seeded db');
  });
});