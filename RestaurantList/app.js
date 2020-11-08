// app.js
// require packages used in the project
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = process.env.PORT

const hbs = exphbs.create({ defaultLayout: 'main', extname: '.hbs' }) //, helpers: require('./utils/hbsHelpers') });ㄒ

// setting template engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// login admission
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// log test
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

usePassport(app)
app.use(flash())

// setting global variable
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(myLogger)
app.use(routes)

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})