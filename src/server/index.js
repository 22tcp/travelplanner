var path = require('path')
const dotenv = require('dotenv').config()
const express = require('express')
const uid = require('uid-safe')
const session = require('express-session')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/test', function (req, res) {
    res.status(202).send( { message : "OK" } )
})

app.get('/favicon.ico', (req,res) => {
    res.send('_')
})

app.get('/',  (req, res) => {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
