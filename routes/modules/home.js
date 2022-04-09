const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        const recordId = record.category
        Category.findOne({ _id: recordId })
          .then(category => {
            // if(category.icon) {
            //   record.icon = category.icon
            // }          
          })
        record.date = record.date.toJSON().toString().slice(0, 10)       
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})


module.exports = router