var path = require('path')
const dotenv = require('dotenv').config()
const express = require('express')
const uid = require('uid-safe')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const wmo = require('./wmo.js')
const mockAPIResponse = require('./mockAPI.js')
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

app.get('/favicon.ico', (req,res) => {
  res.send('_')
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(('dist/index.html')))
})



app.post("/yAPI/querydata", function (req, res) {
  let _data = req.body
  req.session.dest = _data["dest"]
  req.session.date = _data["date"]
  req.session.country = _data["country"]
  req.session.fullcountry = _data["fullcountry"]
  res.status(202).send({
    message: "OK"
  })
})

app.get("/yAPI/getEverything", function (req, res) {

  if (req.session.dest) {
    //build up query string for geonames
    let urlgn = `http://api.geonames.org/searchJSON?q=${req.session.dest}&maxRows=1&username=${process.env.geonames_user}`
    if (req.session.country) {
      urlgn += `&country=${req.session.country}`
    }
    //console.log("getLocation :" + urlgn )
    const response = fetch(urlgn)
      .then(response => response.json())
      .then(async (geodata) => {
        let gdata = await geodata
        //console.log(gdata["geonames"][0]["lng"])  
        //console.log(gdata["geonames"][0]["lat"])
        if ( gdata["totalResultsCount"] > 0 ) { req.session.lng = gdata["geonames"][0]["lng"] }
        else { 
          res.end("404")
          return
           }
        if ( gdata["totalResultsCount"] > 0 ) { req.session.lat = gdata["geonames"][0]["lat"] }
        else { 
          res.end("404")
          return
           }
        req.session.querydate = "2022" + req.session.date.substring(4)

        //build up query string for open-meteo because weatherbit went greedy
        req.session.lng = parseFloat(req.session.lng).toFixed(2)
        req.session.lat = parseFloat(req.session.lat).toFixed(2)
        //console.log("session:" + req.session)
        req.session.urlom = `https://archive-api.open-meteo.com/v1/archive?latitude=${req.session.lat}&longitude=${req.session.lng}&start_date=${req.session.querydate}` +
          `&end_date=${req.session.querydate}&daily=weathercode,temperature_2m_mean,precipitation_sum&timezone=Europe%2FBerlin`
        //console.log("url" + req.session.urlom)

        const responseOM = fetch(req.session.urlom)
          .then(responseOM => responseOM.json())
          .then(async (omdata) => {
            let odata = await omdata
            req.session.omdata = odata

            //console.log("raw data " + JSON.stringify(req.session.omdata))
            req.session.wmdactual = wmo[req.session.omdata.daily["weathercode"]]
            //console.log(req.session.wmdactual)
          })
          .then(async () => {
            //if there is valid data the city name is good to get an image
            if (req.session.lng && req.session.lat) {
              req.session.urlpb = `https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${req.session.dest}&image_type=photo`
              //console.log(req.session.urlpb)
              const incomingPB = fetch(req.session.urlpb)
                .then(incomingPB => incomingPB.json())
                .then(async (pbdata) => {
                  let pdata = await pbdata
                  if ( pdata["total"] > 0 ) {
                    req.session.pblink = pdata["hits"][0]["webformatURL"]
                    //console.log(req.session.pblink)
                    res.send(req.session)
                    res.end(200)
                  } else {
                    req.session.urlpb2 = `https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${req.session.fullcountry}&image_type=photo`
                    const incomingPB2 = fetch(req.session.urlpb2)
                      .then(incomingPB2 => incomingPB2.json())
                      .then(async (pbdata2) => {
                        let pdata2 = await pbdata2
                        req.session.pblink = pdata2["hits"][0]["webformatURL"]
                        //console.log("search url " + req.session.urlpb2)
                        //console.log("else :" + req.session.pblink)
                        res.send(req.session)
                        res.end(200)
                      })
                  }            

                })
              //console.log(req.session.pblink)
            } else { 
              res.end(404)
            }
          })
      })
  }
})

module.exports = app