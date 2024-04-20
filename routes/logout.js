var express = require('express');
const User  = require("../models/User")
var router = express.Router();

router.get('/', async function(req, res, next) {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/');
          }
          res.redirect('/');
    })

});

module.exports = router;