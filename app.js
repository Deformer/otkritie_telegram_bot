const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const connection = require('./models');
const router = require('./routes');

const fileUpload = require('express-fileupload');
const app = express();

const TelegramBot = require('node-telegram-bot-api');
const token = '394893817:AAGz0IEah-fBtSJDqmdbc8kAeo__XbkZfB0';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/', router);

const bot_server = require('./bot_server');

bot_server.init();



// connection.sync().then(() => {
//   app.listen(config.port, () => {
//     console.log(`server is listening on port ${config.port}`);
//   });
// });
