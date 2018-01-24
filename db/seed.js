const request = require('superagent')
const users = require('./fixtures/users.json')
const batches = require('./fixtures/batches.json')
const db = require('../config/database')
const faker = require('faker')
const User = require("../models/user")
const Batch = require("../models/batch")

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}

// const dropdb = [
//
//   db.connection.collections['users'].drop(),
//   db.connection.collections['batches'].drop()
// //
// ]

const createBatch = (token, batch) => {
    return request
      .post(createUrl('/batches'))
      .set('Authorization', `Bearer ${token}`)
      .send(batch)
      .then((res) => {
        console.log('Batch seeded...', res.body)
        return res.body
      })
      .catch((err) => {
        console.log(batch)
        console.error('Error seeding batch!', err.message)
      })
}

const authenticate = (email, password) => {
  return request
    .post(createUrl('/sessions'))
    .send({ email, password })
    .then((res) => {
      console.log('Authenticated!')
      return res.body.token
    })
    .catch((err) => {
      console.error('Failed to authenticate!', err.messages)
    })
}

const user1 = users[0]

const createUser = (user) => {
    return request
      .post(createUrl('/users'))
      .send(user)
      .then((res) => {
        console.log('User created!')
        return res.body
      })
      .catch((err) => {
        console.error('Could not create user', err.message)
      })
}

const createStudent = (token, batch, student) => {
  return request
    .post(createUrl('/batches/`${batch.id}`/students'))
    .set('Authorization', `Bearer ${token}`)
    .send(batch)
    .then((res) => {
      console.log('Batch seeded...', res.body)
      return res.body
    })
    .catch((err) => {
      console.log(batch)
      console.error('Error seeding batch!', err.message)
    })
}


const dbCollections = ['users', 'batches']

var promises = dbCollections.map(name => {
  // console.log(name)
  return new Promise((resolve, reject) => {
    console.log(name)
    var coll = db.connection.collections[name]

    coll.drop(err => {
      if (err) {return reject("Cant drop", name)}
      console.log("dropped collection:", name)
      resolve()
    })
  })
})


// Promise.all([
//   new Promise((res, rej) => {
//     db.connection.collections['users'].drop(err => {
//       if (err) {return rej("Cant drop users")}
//
//       res(console.log("dropped collection: users"))
//     })
//   }),
//   new Promise((res, rej) => {
//     db.connection.collections['batches'].drop(err => {
//       if (err) {return rej("Cant drop batches")}
//
//       res(console.log("dropped collection: batches"))
//     })
//   })
//
// ])

Promise.all(promises)
.then((vals) => {
  console.log("all dropped")
})
.catch(err => console.log(err))



Promise.all(users.map((user) => {return createUser(user)}))
  .then(val => {
    console.log(val)
    return authenticate(val[0].email, "123123a")
  })

  .then(token => {
    Promise.all(batches.map(batch => {
      return createBatch(token, batch), token
    }))
  })
  // .then()
  .then((token, batches) => {
    console.log(batches)
    db.connection.close()
  })



  // .catch(err => console.log(err.message))

// books.forEach(function (book) {
//     bookOps.push(saveBookAsync(book));
// });

// const prom1 = db.connection.collections['users'].drop((resolve, reject) => {
//   if (reject){
//     console.log(reject.message);
//   }
//   else{
//     console.log(resolve);
//   }
// })
//
// const prom2 = db.connection.collections['batches'].drop((resolve, reject) => {
//   if (reject){
//     console.log(reject.message);
//   }
//   else{
//     console.log(resolve);
//   }
// })

// console.log(prom1);
// console.log(prom2);

//
// Promise.all([prom1, prom2])
// .then((res) => {
//   return request
//     .post(createUrl('/users'))
//     .send(users[0])
//     .then((res) => {
//       console.log('User created!')
//       return res.body
//     })
//     .catch((err) => {
//       console.error('Could not create user', err.message)
//     })
// })
  // Promise.all([dropcollection('users'), dropcollection('batches')])
  // .then((vals) => console.log(vals))
  // // .catch((err) => console.log(err.message))
  // User.remove({}, function(err) {
  //   if (err) {return done(err)}
  // })
  // Batch.remove({}, function(err) {
  //   if (err) {return done(err)}
  // })
  //
  // var newUsers = []
  //
  // users.forEach(function (user) {
  //   newUsers.push(createUser(user))
  // })
  //
  // Promise.all(newUsers).then((values) => console.log(values))

// Promise.all([
//   db.connection.collections['users'].drop(err => { err}),
//   db.connection.collections['batches'].drop(err => { err})
// ]).then(val => {
//   console.log("finished cleaning")
// }).then(val => {
//   return createUser(user1)
// })


// new Promise(function(resolve, reject) {
//
//   setTimeout(() => resolve(1), 1000); // (*)
//
// }).then(function(result) { // (**)
//
//   alert(result); // 1
//   return result * 2;
//
// }).then(function(result) { // (***)
//
//   alert(result); // 2
//   return result * 2;
//
// }).then(function(result) {
//
//   alert(result); // 4
//   return result * 2;
//
// });


// const user = users[0]
// // console.log(user.email, user.password)
//
// authenticate(user.email, user.password).then((token) => {
//   // console.log(res.body);
//   console.log(token)
//   createBatches(token)
//   // return token
// })
// console.log(token);
// var prom = new Promise((resolve) => {
//   // console.log(token);
// })
// console.log(prom)

//
// const token = new Promise((token) =>{
//   authenticate("t1@test.com", "123123a")
// }).then((res) => res).catch((err) => err.message)
//
// console.log((token) => {token});
// //
