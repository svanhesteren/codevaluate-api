const mongoose = require('../config/database')
const { Schema } = mongoose
const faker = require('faker')

const studentSchema = new Schema({
  name: {type:String, required: true},
  picture: {type: String, default: 'http://via.placeholder.com/300x300'},
  batchId: {type: Schema.Types.ObjectId, ref: 'batches', required: true},
})



module.exports = mongoose.model('students', studentSchema)
