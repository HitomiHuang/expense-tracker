const express = require('express')
const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const PORT = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})