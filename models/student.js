const mongoose = require('../config/database')
const { Schema } = mongoose


const studentSchema = new Schema({
  name: {type:String, required: true},
  picture: {type: String},
  batchId: {type: Schema.Types.ObjectId, ref: 'batches', required: true},
  // evaluationId: {type: [Schema.Types.ObjectId], ref: 'evaluations', default: []}
})



module.exports = mongoose.model('students', studentSchema)
