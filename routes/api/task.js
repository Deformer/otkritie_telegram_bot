const router = require('express').Router();
const Task = require('../../models/task');

router.get('/', (req, res) => {
  res.status(200).send('Hi pidor');
});


module.exports = router;
