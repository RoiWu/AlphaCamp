const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenURLSchema = new Schema({
  url: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  shorten: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  }
})
module.exports = mongoose.model('Record', shortenURLSchema)
