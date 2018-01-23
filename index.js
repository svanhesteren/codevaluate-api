// index.js
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const { users, sessions, batches, students, evaluations } = require('./routes')

const port = process.env.PORT || 3030

let app = express()

app
  .use(cors()) // Add a CORS config in there
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())

  // Our routes
  .use(users)
  .use(sessions)
  .use(batches)
  .use(students)
  .use(evaluations)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Route not Found')
    err.status = 404
    next(err)
  })

  // final error handler
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
