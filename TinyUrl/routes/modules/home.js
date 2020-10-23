const express = require('express')
const router = express.Router()

const Record = require('../../models/Webinfo')
const createCode = require('../../utils/createCode')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const { url } = req.body
  Record.find()
    .lean()
    .then(infos => {
      const array = []
      for (let info of infos) array.push(info.shorten)
      const shorten = createCode(array)
      Record.create({ url, shorten })
        .then(() => {
          const webURL = process.env.PORT ? `https://desolate-depths-07685.herokuapp.com/${shorten}` : `http://localhost:3000/${shorten}`
          res.render('shorten', { webURL })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.get('/:shorten', (req, res) => {
  const shorten = req.params.shorten
  Record.find({ shorten: shorten })
    .lean()
    .then(info => {
      if (info.length === 1) {
        res.redirect(info[0].url)
      } else {
        res.redirect("/")
      }
    })
    .catch(error => console.log(error))
})

module.exports = router

