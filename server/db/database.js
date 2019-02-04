'use strict'

// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).

const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

console.log(chalk.yellow('Opening database connection'))

// const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
const db = new Sequelize(
  process.env.DATABASE_URL || // FOR DEPLOYED APP
  // `postgres://tftdtwrndheqqu:b44bcc8d6f18a44c6f33a547949ac174d8ece96797576d59d682c9e3979e9282@ec2-54-163-245-64.compute-1.amazonaws.com:5432/d6bk1bgmp7tac0`  // FOR DEPLOYED APP
  `postgres://localhost:5432/${pkg.name}` // FOR DEVELOPMENT
  , {
    logging: false // so we don't see all the SQL queries getting made
  }
)

module.exports = db
