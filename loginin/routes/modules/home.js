const express = require('express')
const router = express.Router()

//READ 瀏覽所有餐廳
router.get('/', (req, res) => {
  const cssfile = "index"
  res.render('index', { cssfile })
})

module.exports = router