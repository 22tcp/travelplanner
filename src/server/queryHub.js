const express = require('express')
const router = express.Router()
const util = require('util')

router.post("/querydata", function (req,res) {
  let _data = req.body
  req.session.dest = _data["dest"]
  req.session.date = _data["date"]
  req.session.country = _data["country"]
  res.status(202).send( { 
    message : "OK"
 } )
})

router.get("/getLocation", function (req,res) {
  
  if ( req.session.dest ) {
    let url = `http://api.geonames.org/searchJSON?q=${req.session.dest}&maxRows=1&username=${process.env.geonames_user}`
    if ( req.session.country ) {
      url += `&country=${req.session.country}`
    }
    console.log("getLocation :" + url )
    const response = fetch(url)
    .then ( response => response.json() )
    .then ( data => {
      console.log(" response " + JSON.stringify(data) )
      
      res.status(202).send( data )
      res.end()
    })
  }
}

)

module.exports = router