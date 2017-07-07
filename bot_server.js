const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');

const config = require('./config');
const { translateVoiceToText, stemmingRussianText } = require('./services/nl_analysis');
const taskService = require('./services/task');
const currencyService = require('./services/currency');

const bot = new TelegramBot(config.telegramToken, { polling: true });

const audioFileArray = [];

module.exports = {
  init() {
    bot.on('message', (msg) => {
        bot.sendChatAction(msg.chat.id, 'typing');
      // console.log(msg);
      if (msg.voice) {
        const fileId = msg.voice.file_id;
        bot.getFile(fileId).then((response) => {
          const filePath = response.file_path;
          // .replace(/.oga/, '.ogg');
          bot.getFileLink(fileId).then((fileLink) => {
            const newFile = fs.createWriteStream(`./resources/${filePath}`);
            request(fileLink).pipe(newFile);
            newFile.on('close', () => {
              translateVoiceToText(`./resources/${filePath}`)
                .then(translatedText => translatedText)
                .then(translatedText => stemmingRussianText(translatedText.results[0].text))
                .then((stemmedWords) => {
                console.log(stemmedWords);
                  taskService.findTaskKeyWords(stemmedWords).then((res) => {
                    if (res.length !== 0) {
                      if (stemmedWords.indexOf('евр') > -1 || stemmedWords.indexOf('доллар') > -1) {
                        const type = stemmedWords.indexOf('евр') > -1 ? 'EUR' : 'USD';
                        currencyService.getCurrency(type)
                            .then(info => {
                              // console.log('result is', info);
                              const value = info.Value;
                              bot.sendMessage(msg.chat.id, res[0].answer + value);
                            })
                      } else bot.sendMessage(msg.chat.id, res[0].answer);
                    } else {
                      bot.sendMessage(msg.chat.id, 'ваш запрос гавно');
                    }
                  });
                });
            });
            const fileMeta = { chatId: msg.chat.id, fileId, fileLink };
            audioFileArray.push(fileMeta);
            console.log(`New voice message received: ${fileId}`);
          });
        });
      } else if (msg.entities && msg.entities[0].type === 'bot_command') {
        const fullCommand = msg.text;
        console.log(`New bot command received: ${fullCommand}`);
        switch (fullCommand) {
          case '/print': {
            audioFileArray.forEach((file) => {
              bot.sendMessage(file.chatId, `тут пусто`);
            });
          }
        }
      }
    });
  },
};
