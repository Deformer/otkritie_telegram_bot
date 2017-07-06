const router = require('express').Router();
const taskRouter = require('./task');
const audioRouter = require('./audio');

router.use('/', taskRouter);
router.use('/', audioRouter);

module.exports = router;
