// routes/users.js
const router = require('express').Router()
const { Student, Batch, Evaluation } = require('../models')
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false })


const loadBatch = (req, res, next) => {
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

  Student.find().where('batchId').equals(id)
    .then((students) => {
      req.batch.students = students
      next()
    })
    .catch((error) => next(error))
}


const findEval = (studentId) => {

    return Evaluation.findOne().where('studentId').equals(studentId).sort({'date':-1}).exec()

}




  router
    .get('/students/:studentId', (req, res, next) => {
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


    .get('/batches/:batchId/students', loadBatch, findStudents, (req, res, next) => {
      if (!req.batch) { return next() }
      const students = req.batch.students
      res.json(students)
    })

    .get('/batches/:batchId/latestevals', loadBatch, findStudents, (req, res, next) => {
      if (!req.batch) { return next() }
      const students = req.batch.students

      var latestEvals = []

      var vals = req.batch.students.map(student => {

        return findEval(student._id)
      })

      Promise.all(vals).then(evals => {
        console.log(evals)
        res.json(evals)
      })


      })




    .post('/batches/:batchId/students', authenticate, loadBatch, (req, res, next) => {
      if(!req.account) {
        const error = new Error('Unauthorized user')
        error.status = 401
        return next(error)
      }

      if(!req.batch) {return next()}

      const newStudent = {...req.body, batchId: req.batch._id}

      Student.create(newStudent)
        .then((student) => {
          res.status(201)
          res.json(student)
        })
        .catch((error) => next(error))
    })

    .patch('/students/:studentId', authenticate, (req, res, next) => {
      if(!req.account) {return next()}
      const studentId = req.params.studentId
      const patchForStudent = req.body

      Student.findById(studentId)
        .then((student) => {
          if(!student) {return next()}
          console.log(req.account._id)



          const updatedStudent = {...student, ...patchForStudent}

          Student.findByIdAndUpdate(studentId, {$set: updatedStudent }, {new: true})
            .then((student) => {
              if (!student) { return next() }
              res.json(student)
            })
        })
        .catch((error) => next(error))
    })




module.exports = router
