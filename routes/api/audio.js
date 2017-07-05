/**
 * Created by Viacheslav Osadchiy on 05.07.2017.
 */

const router = require('express').Router();

router.post('/audio', (req, res) => {
    const file = req.files.audio;

    res.status(200).send(file);
});


module.exports = router;
