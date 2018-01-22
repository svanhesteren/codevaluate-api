const mongoose = require('../config/database')
const { Schema } = mongoose



const batchSchema = new Schema({
  name: {type:Number, required: true},
  start_date: {type: Date, default: Date.now},
  end_date: {type: Date, default: Date.now},
  studentId: {type: [Schema.Types.ObjectId], ref: 'students', default: []}
})








module.exports = mongoose.model('batches', batchSchema)
