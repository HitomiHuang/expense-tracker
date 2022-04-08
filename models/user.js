const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  userId:{
    type: Number,
    required:true
  },
  name:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)