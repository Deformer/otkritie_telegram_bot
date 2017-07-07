/**
 * Created by sergey on 04.07.17.
 */
const connection = require('./index');
const Sequelize = require('sequelize');

const KeyWord = require('./keyWord');

const Task = connection.define('task', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  answer: {
    type: Sequelize.TEXT,
  },
});

Task.hasMany(KeyWord, { foreignKey: 'taskId' });

module.exports = Task;

/*Task.create({
  answer: `Услуга "смс-инфо" платная по Вашей карте. Вы можете
отключить данную услугу по телефону нашей горячей
линии (звонок бесплатный), в отделении банка и через
банкомат. При этом Вам не будут приходить смс по
приходным и расходным операциям. `,
  key_words: [
    {
      text: 'отключ',
      type: 'verbs',
    },
    {
      text: 'смс',
      type: 'nouns',
    },
    {
      text: 'sms',
      type: 'nouns',
    },
  ],
}, {
  include: [KeyWord],
});

Task.create({
  answer: 'Ближайший банкомат в ТЦ "Галлерея"',
  key_words: [
    {
      text: 'банкомат',
      type: 'nouns',
    },
    {
      text: 'ближайш',
      type: 'verbs',
    },
    {
      text: 'покаж',
      type: 'verbs',
    },
    {
      text: 'где',
      type: 'verbs',
    },
    {
      text: 'ряд',
      type: 'verbs',
    },
    {
      text: 'недалек',
      type: 'verbs',
    },
  ],
}, {
  include: [KeyWord],
});

Task.create({
  answer: 'Курс доллара на сегодня: ',
  type: 'USD',
  key_words: [
    {
      text: 'курс',
      type: 'verbs',
    },
    {
      text: 'доллар',
      type: 'nouns',
    },
    {
      text: 'сто',
      type: 'verbs',
    },
    {
      text: 'стоим',
      type: 'verbs',
    },
    {
      text: 'цен',
      type: 'verbs',
    },
  ],
}, {
  include: [KeyWord],
});

Task.create({
  answer: 'Курс евро на сегодня: ',
  type: 'EUR',
  key_words: [
    {
      text: 'курс',
      type: 'verbs',
    },
    {
      text: 'евр',
      type: 'nouns',
    },
    {
      text: 'сто',
      type: 'verbs',
    },
    {
      text: 'стоим',
      type: 'verbs',
    },
    {
      text: 'цен',
      type: 'verbs',
    },
  ],
}, {
  include: [KeyWord],
});

Task.create({
  answer: `Ваш пин-код знаете только Вы. Если пин-конверта нет и Вы
забыли пин-код, то пин-код можно сменить. Если Вам
требуется сменить пин-код или установить его, то в
приложении "Открытия" зайдите в раздел "Мои деньги",
выберите карту, далее нажмите "Полезное" и далее
"Смена пин-кода".`,
  key_words: [
    {
      text: 'пин',
      type: 'nouns',
    },
    {
      text: 'пинкод',
      type: 'nouns',
    },
   {
     text: 'код',
     type: 'nouns',
   },
    {
      text: 'парол',
      type: 'nouns',
    },
    {
      text: 'заб',
      type: 'verbs',
    },
    {
      text: 'восстанов',
      type: 'verbs',
    },
    {
      text: 'помн',
      type: 'verbs',
    },
    {
      text: 'напомн',
      type: 'verbs',
    },
    {
      text: 'смен',
      type: 'verbs',

    },
    {
      text: 'измен',
      type: 'verbs',
    },
    {
      text: 'поменя',
      type: 'verbs',
    },
  ],
}, {
  include: [KeyWord],
});*/
