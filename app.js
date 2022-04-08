const express = require('express')
require('./config/mongoose')

const app = express()
const PORT = 3000

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})