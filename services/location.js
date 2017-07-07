/**
 * Created by Viacheslav Osadchiy on 07.07.2017.
 */

const https = require('https');
const concat = require('concat-stream');
const config = require('../config');

/**
 * Возвращает массив из банкоматов в заданном радиусе
 * @param lat
 * @param lon
 */
const getNearAtm = (lat, lon) => new Promise((resolve, reject) => {
    https.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        +lat+','+lon+'&radius='+config.constants.searchRadius+'&type=atm&key='
        + config.googlePlacesApiKey, resp => {
        resp.on('error', error => reject(error));
        resp.pipe(concat(buffer => {
            const data = JSON.parse(buffer.toString());
            console.log(data);
            resolve (data.results.slice(0,config.constants.maxAtmCount));
        }))
    })
});

module.exports = {
    getNearAtm
};
