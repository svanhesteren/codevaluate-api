const request = require('superagent')
const users = require('./fixtures/users.json')
const batches = require('./fixtures/batches.json')

const User = require("../models/user")
const Batch = require("../models/batch")

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}


// const createGame = (token) => {
//   request
//     .post(createUrl('/games'))
//     .set('Authorization', `Bearer ${token}`)
// }
const createBatches = (token) => {
  return batches.map((batch) => {
    console.log(batch);
    return request
      .post(createUrl('/batches'))
      .set('Authorization', `Bearer ${token}`)
      .send(batch)
      .then((res) => {
        console.log('Batch seeded...', res.body.title)
      })
      .catch((err) => {
        console.error('Error seeding batch!', err.messages)
      })
  })
}

const authenticate = (email, password) => {
  return request
    .post(createUrl('/sessions'))
    .send({ email, password })
    .then((res) => {
      console.log('Authenticated!')
      // console.log(res.body.token);
      res.body.token
    })
    .catch((err) => {
      console.error('Failed to authenticate!', err.messages)
    })
}


// users.map( (user) => {
//   request
//     .post(createUrl('/users'))
//     .send(user)
//
//     .then((res) => {
//       console.log('User created!')
//       res.json(res.body)
//       // const token = authenticate(user.email, user.password)
//     })
//     .catch((err) => {
//       console.error('Could not create user', err.message)
//       console.log('Trying to continue...')
//       // const token = authenticate(user.email, user.password)
//     })
// })
// var user = JSON.parse(users)[0];
// console.log(user);
// const token = request
//   .post(createUrl('/sessions')
//   .send({user.email, user.password})
//
// console.log(token);

const token = new Promise((token) =>{
  authenticate("t1@test.com", "123123a")
}).then((res) => res).catch((err) => err.message)

console.log((token) => {token});
//
createBatches(token)
