/**
 * Created by sergey on 04.07.17.
 */
const connection = require('./index');
const Sequelize = require('sequelize');

const KeyWord = require('./keyWord');

const Task = connection.define('task', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  answer: {
    type: Sequelize.TEXT,
  },
});

Task.hasMany(KeyWord, { foreignKey: 'taskId' });

module.exports = Task;
