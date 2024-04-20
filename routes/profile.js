var express = require('express');
const User  = require("../models/User")
var router = express.Router();

const sessionChecker = (req, res, next)=>{
    if(req.session.user){
      next()
    }else{
      res.redirect("/?msg=raf")
    }
  }

router.use(sessionChecker)

router.get('/profile', async function(req, res, next) {


});

module.exports = router;