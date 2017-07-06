const connection = require('./index');
const Sequelize = require('sequelize');

const KeyWord = connection.define('key_word', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
});


module.exports = KeyWord;
