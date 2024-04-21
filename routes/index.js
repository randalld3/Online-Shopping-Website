var express = require('express');
const Product  = require("../Models/Product");
const User  = require("../models/User");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.session.user });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', user: req.session.user  });
});




/* GET login page. */
router.get('/admin', function(req, res, next) {
  if (!req.session.user || !req.session.user.is_admin){
    return res.redirect("/")
  }

  res.render('admin', { title: 'admin', user: req.session.user  });
});


router.post('/admin/add-user', async function(req, res, next) {
  if (!req.session.user || !req.session.user.is_admin){
    return res.redirect("/")
  }

  await User.create({
    firstName: req.body.userFirstName,
    lastName: req.body.lastName,
    email: req.body.email,
    company: req.body.company,
    security_question: req.body.security_question,
    security_answer: req.body.security_answer,
    password: req.body.password
  })

  res.redirect("/admin");
});


router.post('/admin/add-item', async function(req, res, next) {
  if (!req.session.user || !req.session.user.is_admin){
      return res.redirect("/")
  }


  await Product.create({
    name: req.body.userFirstName,
    gender: req.body.lastName,
    material: req.body.email,
    frame: req.body.company,
    type: req.body.security_question,
    size: req.body.security_answer,
    company: req.body.password
  })

  res.redirect("/admin");
});


router.post('/admin/remove-item', async function(req, res, next) {
  if (!req.session.user || !req.session.user.is_admin){
    return res.redirect("/")
  }
  let item = await Product.findProduct(req.body.itemRemove)
  item.destroy()

  res.redirect("/admin");
});


router.post('/admin/remove-user', async function(req, res, next) {
  if (!req.session.user || !req.session.user.is_admin){
    return res.redirect("/")
  }
  let user = await User.findUser(req.body.userRemove)
  user.destroy()

  res.redirect("/admin");
});




/* GET forgot-password page. */
router.get('/forgot-password', function(req, res, next) {
  res.render('forgot-password', { title: 'Forgot-Password', user: req.session.user  });
});

router.post('/password-change', async function(req, res, next) {
  let user = await User.findUser(req.body.email)

  if (req.body.recovery_answer === user.securityAnswer){
    await User.update(
      {
        password: req.body.password
      },
      {
        where: {
          email: user.email
        }
      }
    );

  }


  res.redirect("/login")
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
router.get('/checkout', async function(req, res, next) {
  if (!req.session.user){
    res.redirect("/login")
  }

  if (req.session.cart.length < 1) {
    res.redirect("/")
  }
  await Product.findAll().then(glasses =>{
    const prices = {}

    glasses.forEach(glass =>{
      prices[glass.name] = glass.price
    })

    res.render('checkout', { title: 'Checkout', user: req.session.user, cart: req.session.cart, price: prices  });
  })
});

/* GET confirmation page. */
router.get('/confirmation', function(req, res, next) {
  if(!req.session.user || !req.session.order){
    res.redirect("/")
  }
  res.render('confirmation', { title: 'Confirmation', user: req.session.user  });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  if (!req.session.user){
    res.redirect("/login")
  }
    res.render('profile', { title: 'Profile', user: req.session.user, userType: req.session.user.is_seller  });

});

/* GET edit-profile page. */
router.get('/edit-profile', function(req, res, next) {
  if (!req.session.user){
    res.redirect("/login")
  }

  res.render('edit-profile', { title: 'Edit-Profile', user: req.session.user  });
});

router.post('/update-profile-info', async function(req, res, next) {
  if (!req.session.user){
     return res.redirect("/login")
  }

  if (req.body.password !== req.session.user.password){
    return res.redirect("/profile/?msg=passwordError")
  }

  await User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      email: req.body.email

    },
    {
      where: {
        email: req.session.user.email
      }
    }
  );

  req.session.user = await User.findUser(req.body.email)

  
  res.redirect('/edit-profile');
});

router.get('/products', function(req, res, next) {
  if (!req.session.user || !req.session.user.is_seller){
    return res.redirect("/login")
 }
  res.render('products', { title: 'products', user: req.session.user  });
});

router.post('/products/add-item', async function(req, res, next) {
  if (!req.session.user || !req.session.user.is_seller){
    return res.redirect("/login")
 }

 await Product.create({ 
  name: req.body.name,
  gender: req.body.gender,
  material: req.body.material,
  frame: req.body.frame,
  size: req.body.size,
  type: req.body.type,
  company: req.session.user.company,
  price: parseFloat(req.body.price)
})
  res.redirect('/profile');
});

router.post('/products/remove-item', async function(req, res, next) {
  if (!req.session.user || !req.session.user.is_seller){
    return res.redirect("/login")
 }

 let product = await Product.findProduct(req.body.nameRemove)

 if (req.session.user.company === product.company){
    product.destroy()
    return res.redirect("/profile?msg=itemRemoved")
 }

 return res.redirect("/profile?msg=invalid_itam")
});

module.exports = router;
