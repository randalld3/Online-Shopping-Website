var express = require('express');
const User  = require("../models/User")
const Product  = require("../models/Product")
const Order  = require("../models/Order")
var router = express.Router();


router.post('/order', async function(req, res, next) {
    if(Object.keys(req.session.cart).length < 1){
        res.redirect("/")
    }
    const prices = {}
    const order = {}
    await Product.findAll().then(glasses =>{


        glasses.forEach(glass =>{
        prices[glass.name] = glass.price
        })
    })
    Object.keys(req.session.cart).forEach(item =>{
        qty = req.session.cart[item]
        subtotal = (prices[item] * qty).toFixed(2)
        order[item] = [qty, subtotal]

        })
    req.session.cart = {}

    await Order.create({ 
        user: req.session.user.email,
        items: order,
        date: new Date()   
    })

    res.render('confirmation', { title: 'Confirmation', user: req.session.user, order: order, date: "Soon"});
 

});

module.exports = router;