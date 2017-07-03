/**
 * Created by sergey on 03.07.17.
 */

const yandex_speech = require('yandex-speech');
const config = require('./config');

yandex_speech.ASR({
  developer_key: config.yandexSpeechKey,  // get in Yandex Developer Center
  file: 'data/1.mp3', // check format
  lang: 'ru-RU',      // ['ru-RU', 'tr-TR'],
}, (err, httpResponse, xml) => {
  if (err) {
    console.log(err);
  } else {
    console.log(httpResponse.statusCode, xml);
  }
},
);
