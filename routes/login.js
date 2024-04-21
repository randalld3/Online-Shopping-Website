var express = require('express');
const User  = require("../models/User")
var router = express.Router();


router.post('/', async function(req, res, next) {
    const user = await User.findUser(req.body.email)

    console.log(req.body.password)

    if (user!== null && req.body.password === user.password){
        req.session.user = user
        req.session.cart = {}
        res.redirect("/")
    }else{
        
        res.redirect("/login")
    }

});

module.exports = router;