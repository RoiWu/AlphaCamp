// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting the route and corresponding response
app.get('/', (req, res) => {
  const cssfile = "index"
  res.render('index', { cssfile, restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
    const cssfile = "index"
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { cssfile, restaurants, keyword})
  })

app.get('/restaurants/:restaurant_id', (req, res) => {
    const cssfile = "show"
    const restaurant = restaurantList.results.find(
        restaurant => restaurant.id == req.params.restaurant_id
      )
    res.render('show', { cssfile, restaurant })
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})