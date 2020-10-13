const express = require('express')
const router = express.Router()

const Account = require('../../models/accounts')

//READ 瀏覽所有餐廳
router.post('/', (req, res) => {
  const cssfile = "index"
  const { email, password } = req.body
  Account.findOne({ email: email, password: password })
    .lean()
    .then((info) => {
      if (info) {
        res.redirect('/login/' + info.firstName)
      } else {
        res.redirect('/')
      }
    })
    .catch(error => console.error(error)) // 錯誤處理
})

router.get('/:name', (req, res) => {
  const name = req.params.name
  res.render('welcome', { name })
})

module.exports = router