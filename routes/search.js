var express = require('express');
const Product  = require("../models/Product")
var router = express.Router();
const querystring = require('querystring');
const { Op } = require("sequelize")

router.post('/filter', async function(req, res, next) {

    let criteria = {}
    const params = ["gender", "price", "frame", "material", "type", "size"]

    params.forEach(param => {
      if (req.body[param]){
          criteria[param] = req.body[param]
      }
        
  });
  
  minPrice = req.body.minPrice
  maxPrice = req.body.maxPrice

  if (minPrice && maxPrice) {
    criteria['price'] = minPrice + "-" + maxPrice
  } else if (minPrice) {
    criteria['price'] = "<"+ minPrice
  } else if (maxPrice) {
    criteria['price'] = ">"+ maxPrice
  }

  const queryString = querystring.stringify(criteria)

  res.redirect(`/search?${queryString}`)
    
});

module.exports = router;