var express = require('express');
var router = express.Router();
const User = require("../models/User");
const sequelize = require('../db');

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register', user: req.session.user  });
});

router.post("/", async function (req, res, next) {
  
  let user = await User.findUser(req.body.email)

  if (user === null){
    user = await User.create({ 
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      company: req.body.company,
      security_question: req.body.securityQuestion,
      security_answer: req.body.securityAnswer,
      email: req.body.email,
      is_seller: (req.body.userType === "seller"),
      is_admin: false
    })
    res.redirect("/login")
    
  } else{
    res.redirect("/register")
  }
 
})

module.exports = router;
