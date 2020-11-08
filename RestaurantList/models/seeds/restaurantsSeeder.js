//const db = require('../../config/mongoose')

const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurants') // 載入 todo model

/*
db.once('open', () => {
  Restaurant.create(Object.assign(restaurantList.results, restaurantList))
    .then(() => {
      console.log('done.')
      db.close()
    })
})*/

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: restaurantList.results.length },
        (_, i) => {
          const { name, name_en, category, image, location, phone, google_map, rating, description } = restaurantList.results[i]
          return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
        }
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
