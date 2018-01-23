// routes/users.js
const router = require('express').Router()
const { Student, Batch } = require('../../models')
const passport = require('../../config/auth')
const authenticate = passport.authorize('jwt', { session: false })


const loadBatch = (req, res, next) => {
  const id = req.params.id

  Batch.findById(id)
    .then((batch) => {
      req.batch = batch
      next()
    })
    .catch((error) => next(error))
}

const findStudents = (req, res, next) => {

  const id = req.params.id
  console.log(id)

  Student.find().where('batchId').equals(id)
    .then((students) => {
      req.batch.students = students
      next()
    })
    .catch((error) => next(error))
}


  router
    // .get('batches/:id/students', loadGame, (req, res, next) => {
    //   const batchId = req.match.id
    // })

    .get('/batches/:id/students', loadBatch, findStudents, (req, res, next) => {
      if (!req.batch) { return next() }
      const students = req.batch.students
      res.json(students)
    })


    .post('/batches/:id/students', authenticate, loadBatch, (req, res, next) => {
      if(!req.account) {
        const error = new Error('Unauthorized user')
        error.status = 401
        return next(error)
      }

      if(!req.batch) {return next()}
      // const userId = req.account._id

      const newStudent = {
        name: req.body.name,
        batchId: req.batch._id
      }

      const createdStudent = Student.create(newStudent)
        .then((student) => {
          res.status(201)
          res.json(student)
        })
        .catch((error) => next(error))
    })
    // const newStudentList = [...req.batch.students, createStudent._id ]






module.exports = router
