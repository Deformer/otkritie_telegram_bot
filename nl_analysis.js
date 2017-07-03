/**
 * Created by sergey on 03.07.17.
 */

const uuidv4 = require('uuid/v4');
const yandexSpeech = require('yandex-speech');
const config = require('./config');
const parseString = require('xml2js').parseString;

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

    resolve(response);
  });
});

require('fs').createReadStream('public/how_to_reestablish_pin.mp3').pipe(yandexSpeech.ASR({
  developer_key: config.yandexSpeechKey,  // get in Yandex Developer Center
  // file: 'public/how_to_reestablish_pin.mp3', // check format
  uuid: uuidv4().replace(/-/g, ''),    // UUID without hyphens
  topic: 'queries',  // ['queries', 'maps', 'notes', 'music']
  lang: 'ru-RU',      // ['ru-RU', 'tr-TR'],
  filetype: 'audio/x-mpeg-3',  // ['audio/x-speex', 'audio/x-pcm;bit=16;rate=8000', 'audio/x-pcm;bit=16;rate=16000', 'audio/x-alaw;bit=13;rate=8000', 'audio/x-wav', 'audio/x-mpeg-3']
}, (err, httpResponse, xml) => {
  if (err) {
    console.log(err);
  } else {
    console.log(httpResponse.statusCode);
    formatSuccessResponse(xml).then((resp) => {
      console.log(resp);
    });
  }
}));
