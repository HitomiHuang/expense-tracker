const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
router.get('/', (req, res) => {
  const userId = req.user._id
  const filterValue = req.query.categoryFilter
  let filterName = ''
  Record.find({ userId })
    .lean()
    .then(records => {
      return Category.find()
                     .lean()
                     .then((categories) => {
                       let filterRecord = records
                       let totalAmount = 0              
                                           
                       records.forEach(record => {
                         const categoryId = record.categoryId  
                         record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
                         record.date = record.date.toJSON().toString().slice(0, 10)
                         totalAmount += record.amount
                       })
                       if (filterValue) {   
                         if(filterValue !== "0"){
                           filterName = categories.filter(category => category._id.equals(filterValue))[0].name
                           filterRecord = records.filter(item => item.categoryId.equals(filterValue))
                         } 
                       }
                        return res.render('index', { records: filterRecord, totalAmount, categories, filterName })
                     })
    })
    .catch(error => console.log(error))
})

module.exports = router