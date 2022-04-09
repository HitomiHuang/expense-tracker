const Category = require('../category')
const db = require('../../config/mongoose')

const SEED_CATEGORY = [
  {
    name: '家居物業',
    icon: 'fa-solid fa-house',
    unicode: '&#xf015;'
  },
  {
    name: '交通出行',
    icon: 'fa-solid fa-van-shuttle',
    unicode: '&#xf5b6;'
  },
  {
    name: '休閒娛樂',
    icon: 'fa-solid fa-face-grin-beam',
    unicode: '&#xf582;'
  },
  {
    name: '餐飲食品',
    icon: 'fa-solid fa-utensils',
    unicode: '&#xf2e7;'
  },
  {
    name: '其他',
    icon: 'fa-solid fa-pen',
    unicode: '&#xf304;'
  },
]


db.once('open', () => {
  Promise.all(Array.from(SEED_CATEGORY, SEED => Category.create(SEED)))
  .then(() => {
    console.log('done')
    process.exit()
  })
})