const Sequelize = require('sequelize');

const MODEL_NAME = 'user';

module.exports = sequelize => ({
  name: MODEL_NAME,
  routes: ['create', 'find-page'],
  model: sequelize.define(
    MODEL_NAME,
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      username: Sequelize.STRING
    },
    {
      charset: 'utf8'
    }
  )
});
