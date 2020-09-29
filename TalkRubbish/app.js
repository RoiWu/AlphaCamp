// Include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// models 
const generateRubbish = require('./models/generateRubbish')

// database
const occupations = require('./database/occupation.json')

const app = express()
const hbs = exphbs.create({ defaultLayout: 'main', extname: '.hbs' });
const port = 3000

// setting template engine
//app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  const choseOccupation = ""
  const cssfile = "index"
  const occupation = occupations.info
  res.render('index', { cssfile, occupation, choseOccupation })
})

app.post('/', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.redirect('/')
  } else {
    const name = occupations.info.find(job => job.occupation_en === req.body.occupation)
    const rubbish = "身為一個" + name.occupation + "，" + generateRubbish(req.body)
    const cssfile = "index"
    const occupation = occupations.info
    const choseOccupation = req.body.occupation
    res.render('index', { cssfile, occupation, rubbish, choseOccupation })
  }
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

