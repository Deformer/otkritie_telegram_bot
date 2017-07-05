/**
 * Created by sergey on 04.07.17.
 */
const { dbSettings } = require('../config');
const Sequelize = require('sequelize');

module.exports = new Sequelize(...Object.values(dbSettings));
