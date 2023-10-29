const express = require('express')
const router = express.Router()
const util = require('util')

router.post("/querydata", function (req,res) {
  let _data = req.body
  console.log( JSON.stringify(req.body) )

/*   travelplanData["dest"] = req.session.data.dest
  travelplanData["date"] = req.session.data.date
  travelplanData["country"] = req.session.data.country */
  console.log(travelplanData)
  res.status(202).send( { 
    message : "OK"
 } )
})



module.exports = router