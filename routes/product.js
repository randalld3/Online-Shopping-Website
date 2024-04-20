var express = require('express');
const User  = require("../models/User")
var router = express.Router();

router.post('/add', function(req, res, next) {
    if (!req.session.user){
        res.redirect("/login")
    }

    if (req.body.name in req.session.cart){
        req.session.cart[req.body.name] += req.body.qty
    }
    else{
        req.session.cart[req.body.name] = req.body.qty
    }

    console.log(req.session.cart)
    res.redirect("/product/".concat(req.body.name))
  });

module.exports = router;