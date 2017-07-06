/**
 * Created by sergey on 03.07.17.
 */
module.exports = {
  port: 5030,
  yandexSpeechKey: '1fb760dc-6bd6-4936-bfa5-eb83e5db14ac',
  telegramToken: '394893817:AAGz0IEah-fBtSJDqmdbc8kAeo__XbkZfB0',
  dbSettings: {
    database: 'telegram',
    user: 'admin',
    password: 'admin',
    options: {
      host: 'localhost',
      dialect: 'postgres',
      port: 5432,
      logging: false,
    },
  },
};
