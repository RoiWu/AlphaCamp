const express = require('express')
const router = express.Router()

const Account = require('../../models/accounts')

//READ 瀏覽所有餐廳
router.get('/', (req, res) => {
  const accountinfo = req.headers.cookie
  if (accountinfo) {
    const Cookieinfo = accountinfo.split(';')
      .reduce((res, c) => {
        const [key, val] = c.trim().split('=').map(decodeURIComponent)
        try {
          return Object.assign(res, { [key]: JSON.parse(val) })
        } catch (e) {
          return Object.assign(res, { [key]: val })
        }
      }, {})
      const email = `${Cookieinfo.pre_email}@${Cookieinfo.address}`

      Account.findOne({ email: email })
      .lean()
      .then((info) => {
        if (info) {
          res.redirect('/login/' + info.firstName)
        } else {
          res.redirect('/')
        }
      })
      .catch(error => console.error(error)) // 錯誤處理
  } else {
    res.render('index')    
  }
})

router.get('/out', (req, res) => {
  res.clearCookie("pre_email");
  res.clearCookie("address");
  res.redirect('/')
})

module.exports = router