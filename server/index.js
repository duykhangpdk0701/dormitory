const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express()
const db = require('./src/Service/db.service');
const Route = require('./src/Route');

db.connect()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(cors())

Route(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`Server started at port ${PORT}`)})
