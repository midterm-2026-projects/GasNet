const express = require('express')
const syncRouter = require('./routes/syncStatus')

const app = express()
app.use(express.json())
app.use('/api', syncRouter)

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001
  app.listen(port, () => console.log(`Server listening on ${port}`))
}

module.exports = app
