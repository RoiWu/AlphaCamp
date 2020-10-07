const restaurantList = require('../../restaurant.json')

const Restaurant = require('../restaurants') // 載入 todo model
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(Object.assign(restaurantList.results, restaurantList))
    .then(() => {
      console.log('done.')
      db.close()
    })
})


/*
db.once('open', () => {
  console.log('mongodb connected!')
  for (const item of restaurantList.results) {
    Restaurant.create({
        id: item.id,
        name: item.name,
        name_en: item.name_en,
        category: item.category,
        image: item.image,
        location: item.location,
        phone: item.phone,
        google_map: item.google_map,
        rating: item.rating,
        description: item.description
      })
    }
})*/