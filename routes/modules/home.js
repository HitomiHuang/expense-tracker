const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        const recordId = record.categoryId
        Category.findOne({ recordId })
          .then(category => {
            console.log(category)
            record.icon = category.icon
          })
        record.date = record.date.toJSON().toString().slice(0, 10)       
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})


module.exports = router