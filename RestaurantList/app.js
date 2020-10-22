// app.js
// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const myLogger = function (req, res, next) {
  const start_time = Date.now()
  const start_format = Date(Date.now())
  res.on("finish", () => {
    const finish_time = Date.now()
    duration = finish_time - start_time
    server_message = start_format +
      " | " + req.method + " from " +
      req.originalUrl + " | total time: " + duration + "ms"
    console.log(server_message);
  })
  next()
}

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // API設定時帶上_method就會轉換為HTTP方法
app.use(myLogger)
app.use(routes)

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})