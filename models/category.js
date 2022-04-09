const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '<i class="fa-solid fa-pen"></i>'
  },
  unicode: {
    type: String,
    default: '&#xf304;'
  }
})

module.exports = mongoose.model('Category', categorySchema)