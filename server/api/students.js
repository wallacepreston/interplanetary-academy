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

// POST /api/students
router.post('/', async (req, res, next) => {
  try {
    const student = await Student.create(req.body)
    const returnMessage = student.toJSON();
    res.send(returnMessage);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/students/:studentId
router.delete('/:studentId', async (req, res, next) => {
  try {
    const numDeleted = await Student.destroy({
      where: {
        id: req.params.studentId
      }
    })
    const response = await Student.findAll({
      include: [{model: Campus}]
    });
    res.send(response)
  } catch (error) {
    next(error);
  }
});

module.exports = router
