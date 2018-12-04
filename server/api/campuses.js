const router = require('express').Router()
const {db, Student, Campus} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const response = await Campus.findAll({
      include: [{model: Student}]
    });
    res.send(response)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
