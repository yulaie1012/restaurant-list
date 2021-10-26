const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const restaurantData = require('./restaurant.json').results

db.once('open', () => {
  restaurantData.forEach(item => {
    Restaurant.create(item)
  })
  console.log('done')
})