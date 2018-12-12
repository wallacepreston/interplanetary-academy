'use strict'

// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.

const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

console.log(chalk.yellow('Opening database connection'))

// create the database instance that can be used in other database files
// const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
const db = new Sequelize(`ec2-54-163-245-64.compute-1.amazonaws.com:5432/d6bk1bgmp7tac0`, {
  logging: false // so we don't see all the SQL queries getting made
})

module.exports = db
