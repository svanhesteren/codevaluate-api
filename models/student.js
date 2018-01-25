const mongoose = require('../config/database')
const { Schema } = mongoose
const faker = require('faker')

const studentSchema = new Schema({
  name: {type:String, required: true},
  picture: {type: String, required: true, default: 'http://via.placeholder.com/300x300?text=No%20Image'},
  batchId: {type: Schema.Types.ObjectId, ref: 'batches', required: true},
  // evaluationId: {type: [Schema.Types.ObjectId], ref: 'evaluations', default: []}
})



module.exports = mongoose.model('students', studentSchema)
