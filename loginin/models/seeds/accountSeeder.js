const db = require('../../config/mongoose')

const accountsInfo = require('../accountsInfo.json')
const Account = require('../accounts') // 載入 todo model

db.once('open', () => {
  Account.create(Object.assign(accountsInfo.users, accountsInfo))
    .then(() => {
      console.log('done.')
      db.close()
    })
})