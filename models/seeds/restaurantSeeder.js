const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const restaurantData = require('./restaurant.json').results

const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678',
    defaultList: [1, 2, 3]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    defaultList: [4, 5, 6]
  }
]

db.once('open', () => {
  Promise.all(SEED_USERS.map(SEED_USER => 
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({ name: SEED_USER.name, email: SEED_USER.email, password: hash}))
      .then(user => {
        const userId = user._id
        const restaurants = restaurantData.filter(restaurant => SEED_USER.defaultList.includes(restaurant.id))
        restaurants.forEach(restaurant => restaurant.userId = userId)
        return Restaurant.create(restaurants)  // create() 可以直接放陣列
      })
  ))
    .then(() => {
      console.log('done')
      process.exit()
    })
    .catch(err => console.log(err))
})