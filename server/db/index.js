'use strict'

const db = require('./database')

// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models (which you should define in separate modules in this directory).
// Example:
//
// const Puppy = require('./puppy')
// const Owner = require('./owner')
const Campus = require('./campuses')
const Student = require('./students')
// After you've required all of your models into this module, you should establish
// associations (https://sequelize-guides.netlify.com/association-types/) between them here as well!
// Example:
//
// Puppy.belongsTo(Owner)
Student.belongsTo(Campus);
Campus.hasMany(Student)

module.exports = {
  // Include your models in this exports object as well!
  db,
  Student,
  Campus
}
