const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    name: '廣志',
    email: 'root@example',
    password: '12345678',
    records: [
      {
        name: '午餐',
        date: '2019-04-23',
        amount: 60
      },
      {
        name: '晚餐',
        date: '2019-04-23',
        amount: 60
      },
      {
        name: '捷運',
        date: '2019-04-23',
        amount: 120
      },
      {
        name: '租金',
        date: '2015-04-01',
        amount: 25000
      },
    ] 
  }
]
db.once('open', () => {
  Promise.all(Array.from(SEED_USER, seed => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seed.password, salt))
      .then(hash => User.create({
        name: seed.name,
        email: seed.email,
        password: hash
      }))
    .then(user => {
      const userId = user._id
      seed.records.forEach(record => {
        record.userId = userId  
      })
      return Record.create(seed.records)
    })
  })).then(() => {
    console.log('done.')
    process.exit()
  })
})