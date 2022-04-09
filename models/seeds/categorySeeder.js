const Category = require('../category')
const db = require('../../config/mongoose')

const SEED_CATEGORY = [
  {
    name: '家居物業',
    icon: '<i class="fa-solid fa-house"></i>',
    unicode: '&#xf015;'
  },
  {
    name: '交通出行',
    icon: '<i class="fa-solid fa-van-shuttle"></i>',
    unicode: '&#xf5b6;'
  },
  {
    name: '休閒娛樂',
    icon: '<i class="fa-solid fa-face-grin-beam"></i>',
    unicode: '&#xf582;'
  },
  {
    name: '餐飲食品',
    icon: '<i class="fa-solid fa-utensils"></i>',
    unicode: '&#xf2e7;'
  },
  {
    name: '其他',
    icon: '<i class="fa-solid fa-pen"></i>',
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