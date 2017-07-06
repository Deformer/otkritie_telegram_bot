const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');

const config = require('./config');

const bot = new TelegramBot(config.telegramToken, { polling: true });

const audioFileArray = [];

module.exports = {
  init() {
    bot.on('message', (msg) => {
            // console.log(msg);
      if (msg.voice) {
        const fileId = msg.voice.file_id;
        bot.getFile(fileId).then((response) => {
          const filePath = response.file_path;
          bot.getFileLink(fileId).then((fileLink) => {
            const newFile = fs.createWriteStream(`./resources/${filePath}`);
            request(fileLink).pipe(newFile);

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
              bot.sendMessage(file.chatId, `Link file: ${file.fileLink}`);
            });
          }
        }
      }
    });
  },
};
