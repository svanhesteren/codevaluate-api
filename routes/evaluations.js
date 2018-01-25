// routes/users.js
const router = require('express').Router()
const { Student, Batch, Evaluation } = require('../models')
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false })


const loadStudent = (req, res, next) => {
  const studentId = req.params.studentId
  Student.findById(studentId)
    .then((student) => {
      // if(!student) {return next()}
      // res.json(student)
      req.student = student
      next()
    })
    .catch((error) => next(error))
  }

  const findEvaluations = (req, res, next) => {

    const id = req.params.studentId

    Evaluation.find().where('studentId').equals(id)
      .then((evaluations) => {
        req.student.evaluations = evaluations
        next()
      })
      .catch((error) => next(error))
  }

router

  .get('/evaluations', (req, res, next) => {
    Evaluation.find()
      .then((evaluations) => res.json(evaluations))
      .catch((error) => next(error))
  })

  .get('/evaluations/:evalId', (req, res, next) => {
    const evalId = req.params.evalId
    Evaluation.findById(evalId)
    .then((evaluation) => {
      if(!evaluation) {return next()}
      res.json(evaluation)
    })
    .catch((error) => next(error))
  })

  .get('/students/:studentId/evaluations', loadStudent, findEvaluations, (req, res, next) => {
    if (!req.student) { return next() }
    const evaluations = req.student.evaluations
    res.json(evaluations)
  })

  .post('/students/:studentId/evaluations', authenticate, loadStudent, (req, res, next) => {
    if(!req.account) {
      const error = new Error('Unauthorized user')
      error.status = 401
      return next(error)
    }
    if(!req.student) {return next()}
    // console.log(req.student)

    const newEvaluation = {
      // date: Date.now,
      userId: req.account._id,
      userName: req.account.name,
      studentId: req.student._id,
      code: req.body.code,
      remark: req.body.remark
    }

    Evaluation.create(newEvaluation)
    .then((evaluation) => {
      res.status(201)
      res.json(evaluation)
    })
    .catch((error) => next(error))
  })

  .patch('/evaluations/:evalId', authenticate, (req, res, next) => {
    if(!req.account) {return next()}
    const evalId = req.params.evalId
    const patchForEval = req.body

    Evaluation.findById(evalId)
      .then((evaluation) => {
        if(!evaluation) {return next()}
        console.log(req.account._id)
        console.log(evaluation.userId)

        if(req.account._id.toString() !== evaluation.userId.toString()) {
          const error = new Error("You can only edit your own evaluations")
          error.status = 403
          return next(error)
          }

        const updatedEvaluation = {...evaluation, ...patchForEval}

        Evaluation.findByIdAndUpdate(evalId, {$set: updatedEvaluation }, {new: true})
          .then((evaluation) => {
            if (!evaluation) { return next() }
            res.json(evaluation)
          })
      })
      .catch((error) => next(error))
  })











module.exports = router
