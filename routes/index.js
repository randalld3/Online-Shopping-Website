var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

/* GET search page. */
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Search' });
});

/* GET product page. */
router.get('/product', function(req, res, next) {
  res.render('product', { title: 'Product' });
});

/* GET cart page. */
router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Cart' });
});

/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Checkout' });
});

/* GET confirmation page. */
router.get('/confirmation', function(req, res, next) {
  res.render('confirmation', { title: 'Confirmation' });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

/* GET edit-profile page. */
router.get('/edit-profile', function(req, res, next) {
  res.render('edit-profile', { title: 'Edit-Profile' });
});

module.exports = router;
