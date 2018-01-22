const mongoose = require('../config/database')
const { Schema } = mongoose


const studentSchema = new Schema({
  name: {type:String, required: true},
  picture: {type: String},
  batch: {type: Schema.Types.ObjectId, ref: 'batches', required: true},
  evaluation: {type: [Schema.Types.ObjectId], ref: 'evaluations', default: []}
})



module.exports = mongoose.model('students', studentSchema)
