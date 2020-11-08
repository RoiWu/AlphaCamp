const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurants')

//READ 瀏覽所有餐廳
router.get('/', (req, res) => {
  const cssfile = "index"
  const userId = req.user._id
  Restaurant.find({ userId }) // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    .then(restaurantList => res.render('index', { cssfile, restaurants: restaurantList })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
  //res.render('index', { cssfile, restaurants: restaurantList.results })
})

module.exports = router

