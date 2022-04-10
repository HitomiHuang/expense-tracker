const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    require: true
  },
  date:{
    type: Date,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  categoryId:{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
  }
})

module.exports = mongoose.model('Record', recordSchema)