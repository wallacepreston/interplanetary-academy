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
  catch (error) {
    next(error)
  }
})

// GET /api/campuses/:campusId
router.get('/:campusId', async  (req, res, next) => {
  try{
    const response = await Campus.findById(req.params.campusId, {
      include: [{model: Student}]
    });
    res.send(response)
  }
  catch(error){
    next(error)
  }
});

// POST /api/campuses
router.post('/', async (req, res, next) => {
  try {
    const campus = await Campus.create(req.body)
    const returnMessage = campus.toJSON();
    res.send(returnMessage);
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
  }
});
module.exports = router
