const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'fa-solid fa-pen'
  },
  unicode: {
    type: String,
    default: '&#xf304;'
  }
})

module.exports = mongoose.model('Category', categorySchema)