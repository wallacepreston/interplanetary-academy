const router = require('express').Router()
const {Student, Campus} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const response = await Student.findAll({
      include: [{model: Campus}]
    });
    res.send(response)
  }
  catch (error) {
    next(error)
  }
})

// GET /api/students/:studentId

router.get('/:studentId', async (req, res, next) => {
  try {
    const response = await Student.findById(req.params.studentId, {
      include: [{model: Campus}]
    });
    res.send(response)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
