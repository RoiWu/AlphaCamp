
const db = require('../../config/mongoose')

const webinfo = require('../webinfo.json')
const Record = require('../WebInfo') // 載入 todo model

db.once('open', () => {
  Record.create(Object.assign(webinfo.information, webinfo))
    .then(() => {
      console.log('done.')
      db.close()
    })
})
