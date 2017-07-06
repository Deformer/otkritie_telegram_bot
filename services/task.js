const Task = require('../models/task');
const KeyWord = require('../models/keyWord');

const searchTaskTextsByKeyWords = (keyWords, tasks) => {
  const result = tasks.filter((task) => {
    const taskKW = task.key_words;
    const filteredWords = taskKW.filter((word => keyWords.includes(word.text)));
    return (
      filteredWords.length !== 0 &&
      filteredWords.filter(fw => fw.type === 'nouns').length >= 1 &&
      filteredWords.filter(fw => fw.type === 'verbs').length >= 1
    );
  });
  return result;
};

const getAll = () => Task.findAll({
  include: [KeyWord],
});

const getById = id => Task.findOne({
  where: {
    id,
  },
  include: [KeyWord],
});

const findTaskKeyWords = async (keyWords) => {
  const tasks = await getAll().map(t => t.toJSON());
  return searchTaskTextsByKeyWords(keyWords, tasks);
};


module.exports = {
  getAll,
  getById,
  findTaskKeyWords,
};

/* findTaskKeyWords(['заб', 'пинкод']).then((result) => {
  console.log(result);
});*/
