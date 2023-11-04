//queryHub - a micro API for the endpoints of the travel app
const express = require('express')
const router = express.Router()
const wmo = require('./wmo.js')

router.post("/querydata", function (req, res) {
  let _data = req.body
  req.session.dest = _data["dest"]
  req.session.date = _data["date"]
  req.session.country = _data["country"]
  res.status(202).send({
    message: "OK"
  })
})

router.get("/getEverything", function (req, res) {

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
        req.session.lng = gdata["geonames"][0]["lng"]
        req.session.lat = gdata["geonames"][0]["lat"]
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
              console.log(req.session.urlpb)
              const incomingPB = fetch(req.session.urlpb)
                .then(incomingPB => incomingPB.json())
                .then(async (pbdata) => {
                  let pdata = await pbdata
                  if ( pdata["hits"][0]["webformatURL"] ) {
                    req.session.pblink = pdata["hits"][0]["webformatURL"]
                    console.log(req.session.pblink)
                  } else {
                    req.session.urlpb2 = `https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${req.session.country}&image_type=photo`
                    const responsePB = fetch(req.session.urlpb2)
                      .then(incomingPB2 => incomingPB2.json())
                      .then(async (pbdata2) => {
                        let pdata2 = await pbdata2
                        req.session.pblink = pdata2["hits"][0]["webformatURL"]
                        console.log("else :" + req.session.pblink)
                      })
                  }            
                  res.status(202).send(req.session)
                  res.end()
                })
              //console.log(req.session.pblink)
            

            }
          })
      })
  }
})

module.exports = router