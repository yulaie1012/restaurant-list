const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantData = require('./restaurant.json').results

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantData })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantData.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const lowerCaseKeyword = keyword.toLowerCase()
  const filteredRestaurants = restaurantData.filter(restaurant => restaurant.name.toLowerCase().includes(lowerCaseKeyword) || restaurant.category.toLowerCase().includes(lowerCaseKeyword)
  )
  res.render('index', { restaurants: filteredRestaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
