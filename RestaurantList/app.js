// app.js
// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // API設定時帶上_method就會轉換為HTTP方法

//const restaurantList = require('./restaurant.json')
//const Restaurant = require('./models/restaurants') // 載入 todo model


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
})

app.use(routes)

/*
app.get('/search', (req, res) => {
  const cssfile = "index"
  const keyword = req.query.keyword

  Restaurant.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurantList => {
      const restaurants = restaurantList.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { cssfile, restaurants, keyword })
    }) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
*/
// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})