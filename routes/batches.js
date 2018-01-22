// routes/users.js
const router = require('express').Router()
const { Batch } = require('../models')
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false })

router
  .get('/batches', (req, res, next) => {
    Batch.find()
      .then((batches) => res.json(batches))
      .catch((error) => next(error))
  })

  .get('/batches/:id', (req, res, next) => {
    const id = req.params.id
    Batch.findById(id)
      .then((batch) => {
        if(!batch) {return next()}
        res.json(batch)
      })
      .catch((error) => next(error))
  })

  .post('/batches', authenticate, (req, res, next) => {
    if(!req.account) {
      const error = new Error('Unauthorized user')
      error.status = 401
      return next(error)
    }
    const newBatch = {
      userId: req.account._id,
      name: req.body.name,
      // start_date: req.body.start_date,
      // end_date: req.body.end_date
    }
    Batch.create(newBatch)
      .then((batch) => {
        res.status(201)
        res.json(batch)
      })
      .catch((error) => next(error))
  })

  .patch('/batches/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const patchForBatch = req.body

    Batch.findById(id)
      .then((batch) => {
        if(!batch) {return next()}
        const updatedBatch = {...batch, ...patchForBatch}

        Batch.findByIdAndUpdate(id, {$set: updatedBatch }, {new: true})
          .then((batch) => {
            if (!batch) { return next() }
            res.json(batch)
          })
      })
      .catch((error) => next(error))
  })

module.exports = router
