const mongoose = require('../config/database')
const { Schema } = mongoose



const batchSchema = new Schema({
  name: { type: String, unique: true, required: true  },
  start_date: { type: Date, default: Date.now},
  end_date: { type: Date, default: Date.now},
  userId: { type: Schema.Types.ObjectId, ref: 'users'}
})








module.exports = mongoose.model('batches', batchSchema)
