const express = require('express')
const router = express.Router()
const util = require('util')

router.post("/querycity", function (req,res) {
  let _data = req.body
  req.session.city = JSON.stringify(_data.txt)
  res.status(202).send( { message : "OK" } )
})


















module.exports = router