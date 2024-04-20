var express = require('express');
const Product  = require("../Models/Product");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.session.user });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', user: req.session.user  });
});

/* GET forgot-password page. */
router.get('/forgot-password', function(req, res, next) {
  res.render('forgot-password', { title: 'Forgot-Password', user: req.session.user  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register', user: req.session.user  });
});

/* GET search page. */
router.get('/search', async function(req, res, next) {
  let criteria = {}
  const params = ["gender", "frame", "material", "type", "size"]

  params.forEach(param => {
      if (req.query[param]){
          criteria[param] = req.query[param]
      }
        
  });

  const results = await Product.findAll({
      where: criteria,
      limit: 5
  })

  const glassesArray = results.map(glasses => glasses.toJSON())


  res.render('search', { title: 'Search', user: req.session.user, products: glassesArray  });
});



/* GET product page. */
router.get('/product/:id', async function(req, res, next) {
  glasses = await Product.findProduct(req.params.id)

  if (glasses){
  res.render('product', { title: 'Product', user: req.session.user, product: glasses});
  }
  else{
    res.redirect("/")
  }
});


/* GET cart page. */
router.get('/cart', async function(req, res, next) {
  if (!req.session.user){
    res.redirect("/login")
  }
  await Product.findAll().then(glasses =>{
    const prices = {}

    glasses.forEach(glass =>{
      prices[glass.name] = glass.price
    })
    res.render('cart', { title: 'Cart', user: req.session.user, cart: req.session.cart, price: prices  });
  })
  
});

/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Checkout', user: req.session.user  });
});

/* GET confirmation page. */
router.get('/confirmation', function(req, res, next) {
  res.render('confirmation', { title: 'Confirmation', user: req.session.user  });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  if (req.session.user){
    res.render('profile', { title: 'Profile', user: req.session.user  });
  }else{
    res.redirect("/login")
  }
});

/* GET edit-profile page. */
router.get('/edit-profile', function(req, res, next) {
  res.render('edit-profile', { title: 'Edit-Profile', user: req.session.user  });
});

module.exports = router;
