const {db, Student, Campus} = require('./server/db')
const {green, red} = require('chalk')
const seedCampuses = require('./seed-campuses.json')
const seedStudents = require('./seed-students.json')

const seed = async () => {
  try { await db.sync({force: true})

  // seed your database here!
  await Promise.all(seedCampuses.map(campus => Campus.create(campus)))
  console.log(green('Seeding Campuses success!'))
  await Promise.all(seedStudents.map(student => Student.create(student)))

  console.log(green('Seeding Students success!'))
  db.close()
  }
  catch (err) {
    console.error(err)
  }
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  })