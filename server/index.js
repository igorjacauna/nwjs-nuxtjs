const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV === 'development'

async function start() {
  const app = express()

  app.listen(port, '0.0.0.0')

  app.use(express.static(path.resolve('./dist/')))

}

if (!isDev) {
  start()
}

