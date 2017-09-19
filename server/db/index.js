const Sequelize = require('sequelize');

const db = new Sequelize('bad_programming_jokes', 'root', '', {
  dialect: 'mysql'
});

const User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Joke = db.define('Joke', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Reaction = db.define('Reaction', {
  reactionType: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

User.hasMany(Joke, {foreignKey: {name: 'userId', allowNull: false}});
User.hasMany(Reaction, {foreignKey: {name: 'userId', allowNull: false}});

Joke.belongsTo(User, {foreignKey: {name: 'userId', allowNull: false}});
Joke.hasMany(Reaction, {foreignKey: {name: 'jokeId', allowNull: false}});

Reaction.belongsTo(User, {foreignKey: {name: 'userId', allowNull: false}});
Reaction.belongsTo(Joke, {foreignKey: {name: 'jokeId', allowNull: false}});

db.sync();

module.exports.User = User;
module.exports.Joke = Joke;
module.exports.Reaction = Reaction;

