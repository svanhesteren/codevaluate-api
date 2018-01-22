const mongoose = require('../config/database')
const { Schema } = mongoose



const evaluationSchema = new Schema({
  date: {type: Date, default: Date.now, required: true},
  code: {type: String, required: true},
  remark: {type: String},
  studentId: {type: Schema.Types.ObjectId, ref:'students', required: true},
  batchId: {type: Schema.Types.ObjectId, ref: 'batches', required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'users', required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})



module.exports = mongoose.model('evaluations', evaluationSchema)
