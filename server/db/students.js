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
    type: Sequelize.DECIMAL(10, 1),
    validate: {
      min: 0,
      max: 4
    }
  }

},
{
  hooks: {
    beforeValidate: student => {
      if (student.imageURL === ''){
        student.imageURL = 'https://www.fillmurray.com/g/155/300';
      }
      if (student.campusId === ''){
        student.campusId = null;
      }
      if (student.gpa === ''){
        student.gpa = null;
      }
    }
  }
})

module.exports = Student;
