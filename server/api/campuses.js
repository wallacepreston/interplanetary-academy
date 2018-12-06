const router = require('express').Router()
const {Student, Campus} = require('../db')

// GET /api/campuses/
router.get('/', async (req, res, next) => {
  try {
    const response = await Campus.findAll({
      include: [{model: Student}]
    });
    res.send(response)
  }
  catch (err) {
    next(err)
  }
})

// GET /api/campuses/:campusId
router.get('/:campusId', async  (req, res, next) => {
  try {
    const response = await Campus.findById(req.params.campusId, {
      include: [{model: Student}]
    });
    res.send(response)
  }
  catch (err){
    next(err)
  }
});

// POST /api/campuses
router.post('/', async (req, res, next) => {
  try {
    const campus = await Campus.create(req.body)
    const returnMessage = campus.toJSON();
    res.send(returnMessage);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/campuses/:campusId
router.delete('/:campusId', async (req, res, next) => {
  try {
    const numDeleted = await Campus.destroy({
      where: {
        id: req.params.campusId
      }
    })
    const response = await Campus.findAll({
      include: [{model: Student}]
    });
    res.send(response)
  } catch (err) {
    next(err);
  }
});

// PUT /api/campuses/:campusId
router.put('/:campusId', async (req, res, next) => {
  try {
    await Campus.update(
      req.body,
      {where: {
        id: req.params.campusId
      }})
      const response = await Campus.findAll({
        include: [{model: Student}]
      });
      res.send(response)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
