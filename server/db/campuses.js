'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://media.timeout.com/images/100680467/630/472/image.jpg'
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: Sequelize.TEXT
},
{
  hooks: {
    beforeValidate: campus => {
      if (campus.imageURL === ''){
        campus.imageURL = 'https://media.timeout.com/images/100680467/630/472/image.jpg';
      }
    }
  }
})

module.exports = Campus;
