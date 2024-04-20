var express = require('express');
const User  = require("../models/User")
var router = express.Router();


router.post('/update', async function(req, res, next) {
    if (req.body.qty >= 1){
        req.session.cart[req.body.name] = req.body.qty
    }
    else{
        delete req.session.cart[req.body.name]
    }

    res.redirect("/cart")

});

module.exports = router;