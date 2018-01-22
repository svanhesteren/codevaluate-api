const request = require('superagent')
const users = require('./fixtures/users.json')
// const recipes = require('./fixtures/recipes.json')
const User = require("../models/user")

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}


// const createGame = (token) => {
//   request
//     .post(createUrl('/games'))
//     .set('Authorization', `Bearer ${token}`)
// }


const authenticate = (email, password) => {
  request
    .post(createUrl('/sessions'))
    .send({ email, password })
    .then((res) => {
      console.log('Authenticated!')
      return res.body
    })
    .catch((err) => {
      console.error('Failed to authenticate!', err.message)
    })
}


  users.map( (user) => {
  request
    .post(createUrl('/users'))
    .send(user)

    .then((res) => {
      console.log('User created!')
      return authenticate(user.email, user.password)
    })
    .catch((err) => {
      console.error('Could not create user', err.message)
      console.log('Trying to continue...')
      authenticate(user.email, user.password)
    })
})
