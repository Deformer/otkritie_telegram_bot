const router = require('express').Router();
const taskRouter = require('./task');

router.use('/', taskRouter);

module.exports = router;
