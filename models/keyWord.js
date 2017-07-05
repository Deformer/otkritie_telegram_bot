const connection = require('./index');
const Sequelize = require('sequelize');

const KeyWord = connection.define('keyWord', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: Sequelize.STRING,
  },
});


module.exports = KeyWord;
