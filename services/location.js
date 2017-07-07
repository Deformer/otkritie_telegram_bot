/**
 * Created by Viacheslav Osadchiy on 07.07.2017.
 */

const https = require('https');
const concat = require('concat-stream');
const config = require('../config');

const getNearAtm = (lat, lon) => new Promise((resolve, reject) => {
    https.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        +lat+','+lon+'&radius=10000&type=atm&key='
        + config.googlePlacesApiKey, resp => {
        resp.on('error', error => reject(error));
        resp.pipe(concat(buffer => {
            const data = JSON.parse(buffer.toString());
            console.log(data);
            resolve (data.results.slice(0,10));
        }))
    })
});

module.exports = {
    getNearAtm
};
