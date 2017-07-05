const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const connection = require('./models');
const router = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', router);

connection.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`server is listening on port ${config.port}`);
  });
});
