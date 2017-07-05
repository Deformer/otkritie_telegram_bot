/**
 * Created by sergey on 03.07.17.
 */
module.exports = {
  port: 5030,
  yandexSpeechKey: '1fb760dc-6bd6-4936-bfa5-eb83e5db14ac',
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
