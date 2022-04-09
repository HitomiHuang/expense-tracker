const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')
const category = require('../category')
const SEED_USER = {
    name: '廣志',
    email: 'root@example.com',
    password: '12345678',
    records: [
      {
        name: '午餐',
        date: '2019-04-23',
        amount: 60,
        category: "餐飲食品"
      },
      {
        name: '晚餐',
        date: '2019-04-23',
        amount: 60,
        category: "餐飲食品"
      },
      {
        name: '捷運',
        date: '2019-04-23',
        amount: 120,
        category: "交通出行"
      },
      {
        name: '租金',
        date: '2015-04-01',
        amount: 25000,
        category: "家居物業"
      },
    ] 
}

db.once('open', () => {
  User
    .findOne({ email: SEED_USER.email })
    .then(user => {
      if (user) {
        console.log('User exists.')
        return user
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
    })
    .then(user => {
      return Promise.all(Array.from(SEED_USER.records, record => {
        return Category
          .findOne({ name: record.category })
          .lean()
          .then(category => {
            return Record.create({
              name: record.name,
              date: record.date,
              amount: record.amount,
              userId: user._id,
              categoryId: category._id
            })
          })
      }))
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})

