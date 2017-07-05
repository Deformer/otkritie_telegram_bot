/**
 * Created by sergey on 03.07.17.
 */

const uuidv4 = require('uuid/v4');
const yandexSpeech = require('yandex-speech');
const config = require('../config/index');
const parseString = require('xml2js').parseString;
const fs = require('fs');
const natural = require('natural');
const iconv = require('iconv-lite');
const taskService = require('./task');

natural.PorterStemmerRu.attach();
const stemmingRussianText = text => new Promise((resolve, reject) => {
  resolve(text.tokenizeAndStem());
});


const formatSuccessResponse = xml => new Promise((resolve, reject) => {
  parseString(xml, (err, result) => {
    if (err) return resolve(err);
    const response = {
      success: parseInt(result.recognitionResults.$.success, 10),
      results: parseInt(result.recognitionResults.$.success, 10) === 1 ?
        result.recognitionResults.variant.map(el => ({
          text: el._,
          confidence: el.$.confidence,
        })) :
        null,
    };

    return resolve(response);
  });
});
const translateVoiceToText = fileName => new Promise((resolve, reject) => {
  fs.createReadStream(fileName).pipe(yandexSpeech.ASR({
    developer_key: config.yandexSpeechKey,  // get in Yandex Developer Center
    // file: 'public/how_to_reestablish_pin.mp3', // check format
    uuid: uuidv4().replace(/-/g, ''),    // UUID without hyphens
    topic: 'queries',  // ['queries', 'maps', 'notes', 'music']
    lang: 'ru-RU',      // ['ru-RU', 'tr-TR'],
    filetype: 'audio/ogg;codecs=opus',  // ['audio/x-speex', 'audio/x-pcm;bit=16;rate=8000', 'audio/x-pcm;bit=16;rate=16000', 'audio/x-alaw;bit=13;rate=8000', 'audio/x-wav', 'audio/x-mpeg-3']
  }, (err, httpResponse, xml) => {
    if (err) {
      reject(err);
    } else {
      formatSuccessResponse(xml).then(resolve).catch(reject);
    }
  }));
});

module.exports = {
  translateVoiceToText,
  stemmingRussianText,
};

/* translateVoiceToText('../public/disableSmsNotif/1.mp3').then((response) => {
  stemmingRussianText(response.results[0].text).then((stemmedWords) => {
    // console.log(stemmedWords);
    taskService.findTaskKeyWords(stemmedWords).then((res) => {
      console.log(res[0].answer);
    });
  });
});*/

const parseCSV = fileName => new Promise((resolve, reject) => {
  fs.readFile(fileName, (err, data) => {
    if (err) return reject(err);
    const result = iconv.encode(iconv.decode(data, 'win1251'), 'utf8');
    resolve(result);
  });
});

// parseCSV('public/otkritie.csv').then((resp) => {
//   const text = resp.toString();
//   const lines = text.split('\n');
//   const sentenses = lines.map(line => line.split(';')[2]);
//   // const words = sentenses.reduce((prev, curr) => { // 1 вариант
//   //   return prev.concat(curr.split(' '));
//   // },[]);
//
//   const words = sentenses.reduce((prev, curr) => `${prev} ${curr}`, '').split(' ');
//   const stremmedWords = words.reduce((prev, curr) => {
//     const stremmedWord = curr.stem();
//     prev[stremmedWord] = prev[stremmedWord] ? prev[stremmedWord] + 1 : 0;
//     return prev;
//   }, []);
//   console.log(stremmedWords.filter(el => el !== 0));
// }).catch((err) => {
//   console.log(err);
// });

/* fs.readFile('../public/pinCode/phrases.txt', (err, data) => {
  if (err) return console.log(err);
  const lines = data.toString().split('\n');
  lines.forEach((line) => {
    stemmingRussianText(line).then((stemmedWords) => {
      console.log(stemmedWords);
    });
  })

});*/

