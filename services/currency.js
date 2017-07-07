/**
 * Created by Viacheslav Osadchiy on 07.07.2017.
 */

const http = require('http');
const concat = require('concat-stream');
const parser = require('xml2js');

const getEuro = ()  => {

}

const getDollar = () => {

}

const getCurrency = (type) => new Promise((resolve, reject) => {
    http.get("http://www.cbr.ru/scripts/XML_daily.asp?", resp => {
        resp.on('error', err => reject(error));
        resp.pipe(concat(buffer => {
            const data = buffer.toString();
            parser.parseString(data, (err, result) => {
                // console.log('result', result.ValCurs.Valute);
                resolve(result.ValCurs.Valute.filter(item => {
                    return item['CharCode'].toString() === type;
                })[0]);
            })
        }))

    })
});

module.exports = {
    getCurrency
};
