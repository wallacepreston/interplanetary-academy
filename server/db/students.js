'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.fillmurray.com/g/155/300'
  },
  gpa: {
    type: Sequelize.DECIMAL(10, 1), // I THINK this means I'm creating a decimal (the 10) with 1 decimal place (the 1).
    validate: { // I THINK this means I'm allowing this grade to be between 0.0 and 4.0
      min: 0,
      max: 4
    }
  }

})

module.exports = Student;
