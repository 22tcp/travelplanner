var path = require('path')
const dotenv = require('dotenv').config()
const express = require('express')
const uid = require('uid-safe')
const session = require('express-session')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const queryHub = require('./queryHub.js')
const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//The syntax for samesite is all over the place, so i use all
app.use(session(  {
  secret: process.env.sessionkey,
  resave: true,
  secure: false,
  saveUninitialized: true,
  name: 'travelplanner',
  cookie: { 'sameSite': 'lax','SameSite':'lax','samesite': 'lax', httpOnly: false }
}))

console.log()

//all subsequent calls for local API below microAPI
app.use("/yAPI", queryHub)

//console.log(__dirname)
travelplanData = {
  "version" : "0.1alpha",
  "lang"    : "en"
}



app.get('/test', function (req, res) {
    res.status(202).send(mockAPIResponse )
})

app.get('/favicon.ico', (req,res) => {
    res.send('_')
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(('dist/index.html')))
})

app.get('getData', (req,res) => {
  res.send(projectData)
}) 

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
