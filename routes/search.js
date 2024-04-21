var express = require('express');
const Product  = require("../models/Product")
var router = express.Router();
const querystring = require('querystring');

router.post('/filter', async function(req, res, next) {

    let criteria = {}
    const params = ["gender", "frame", "material", "type", "size"]

    params.forEach(param => {
      if (req.body[param]){
          criteria[param] = req.body[param]
      }
        
  });

  const queryString = querystring.stringify(criteria)

  res.redirect(`/search?${queryString}`)
    
});

module.exports = router;