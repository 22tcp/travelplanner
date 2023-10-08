var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
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
