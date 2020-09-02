require('dotenv').config()
const express = require('express')
const massive = require('massive')
const productCtrl = require('./server/controllers/products_controller')

const { SERVER_PORT, CONNECTION_STRING } = process.env

const app = express()

app.use(express.json())

app.get('/api/products', productCtrl.getAll)
app.get('/api/products/:id', productCtrl.getOne)
app.put('/api/products/:id', productCtrl.update)
app.post('/api/products', productCtrl.create)
app.delete('/api/products/:id', productCtrl.delete)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB READY')
  app.listen(SERVER_PORT, () => { console.log(`ALWAYS LISTENING ON ${SERVER_PORT}`) })
})
  .catch(err => console.log(err))
