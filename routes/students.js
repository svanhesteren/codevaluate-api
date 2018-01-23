// routes/users.js
const router = require('express').Router()
const { Student, Batch } = require('../models')
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false })


const loadBatch = (req, res, next) => {
  // console.log(req.params)
  const id = req.params.batchId

  Batch.findById(id)
    .then((batch) => {
      req.batch = batch
      next()
    })
    .catch((error) => next(error))
}

const findStudents = (req, res, next) => {

  const id = req.params.batchId
  // console.log(id)

  Student.find().where('batchId').equals(id)
    .then((students) => {
      req.batch.students = students
      next()
    })
    .catch((error) => next(error))
}



  router
    .get('/students/:studentId', (req, res, next) => {
      // if(!req.batch) {return next()}
      const studentId = req.params.studentId
      Student.findById(studentId)
        .then((student) => {
          if(!student) {return next()}
          res.json(student)
        })
        .catch((error) => next(error))
    })

    .get('/students', (req, res, next) => {
      Student.find()
        .then((students) => res.json(students))
        .catch((error) => next(error))
    })
    //   const batchId = req.match.id
    // })

    // .get('/batches/:batchId/students/:studentid')

    .get('/batches/:batchId/students', loadBatch, findStudents, (req, res, next) => {
      // console.log(req.params)
      if (!req.batch) { return next() }
      const students = req.batch.students
      res.json(students)
    })


    .post('/batches/:batchId/students', authenticate, loadBatch, (req, res, next) => {
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

      Student.create(newStudent)
        .then((student) => {
          res.status(201)
          res.json(student)
        })
        .catch((error) => next(error))
    })
    // const newStudentList = [...req.batch.students, createStudent._id ]






module.exports = router
