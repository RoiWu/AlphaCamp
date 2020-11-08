
const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurants') // 載入 todo model

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantNumber: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantNumber: [3, 4, 5]
  }
]
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => {
      return Promise.all(Array.from(
        SEED_USERS,
        (SEED_USER, _) => {
          bcrypt.hash(SEED_USER.password, salt)
            .then(hash => User.create({
              name: SEED_USER.name,
              email: SEED_USER.email,
              password: hash
            }))
            .then(user => {
              const userId = user._id
              return Promise.all(Array.from(
                SEED_USER.restaurantNumber,
                (index, _) => {
                  const { name, name_en, category, image, location, phone, google_map, rating, description } = restaurantList.results[index]
                  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
                }
              ))
            })
        }
      ))
    })/*
    .then(() => {
      console.log('done.')
      process.exit()
    })*/
})

