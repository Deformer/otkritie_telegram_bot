const TelegramBot = require('node-telegram-bot-api');
const token = '394893817:AAGz0IEah-fBtSJDqmdbc8kAeo__XbkZfB0';
const bot = new TelegramBot(token, {polling: true});

const request = require('request');
const fs = require('fs');


let audioFileArray = [];

module.exports = {
    init: function () {
        bot.on('message', (msg) => {
            // console.log(msg);
            if (msg.voice) {
                let fileId = msg.voice.file_id;
                bot.getFile(fileId).then(response =>{
                    let filePath = response.file_path;
                    bot.getFileLink(fileId).then(fileLink => {
                        let newFile = fs.createWriteStream(`./resources/${filePath}`);
                        request(fileLink).pipe(newFile);

                        let fileMeta = {chatId: msg.chat.id, fileId: fileId, fileLink: fileLink};
                        audioFileArray.push(fileMeta);
                        console.log(`New voice message received: ${fileId}`);
                    });
                });
            }
            else if (msg.entities && msg.entities[0].type === 'bot_command') {
                let fullCommand = msg.text;
                console.log(`New bot command received: ${fullCommand}`);
                switch (fullCommand) {
                    case '/print': {
                        audioFileArray.forEach(file => {
                            bot.sendMessage(file.chatId, `Link file: ${file.fileLink}`);
                        })
                    }
                }
            }
        });
    }
};