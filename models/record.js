const mongoose = require('mongoose')
const Dateonly = require('mongoose-dateonly')(mongoose)
const Schema = mongoose.Schema
const recordSchema = new Schema({
  id: {
    type: Number,
    
  },
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
  category: {
    type: String
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