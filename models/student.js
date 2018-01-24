const mongoose = require('../config/database')
const { Schema } = mongoose
const faker = require('faker')

const studentSchema = new Schema({
  name: {type:String, required: true},
  picture: {type: String, required: true},
  batchId: {type: Schema.Types.ObjectId, ref: 'batches', required: true},
  // evaluationId: {type: [Schema.Types.ObjectId], ref: 'evaluations', default: []}
})



module.exports = mongoose.model('students', studentSchema)
