const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  const category = []
  Category.find()
    .lean()
    .then(data => {
      data.forEach(item => {
        category.push(item)
      })
      res.render('new', { category })   
    })
})
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const categories = []

  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      const categoryId = record.categoryId
      return Category.find()
          .lean()
          .then(categories => {
            const category = categories.filter(category => category._id.equals(categoryId))[0]
            
            record.date = record.date.toJSON().toString().slice(0, 10)
            return res.render('edit', { record, category, categories })
          })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount} = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  return Record.create({ name, date, categoryId, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router