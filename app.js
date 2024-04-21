var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")
const sequelize = require("./db")
const User = require("./models/User")
const Product = require("./models/Product")

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var profileRouter = require('./routes/profile');
var searchRouter = require('./routes/search');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');
var checkoutRouter = require('./routes/checkout');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("trust proxy", 1)
app.use(session({
    secret: "cat",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))


app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use("/logout", logoutRouter)
app.use("/profile", profileRouter)
app.use("/search", searchRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)
app.use("/checkout", checkoutRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


async function setup(){
  await User.create({ 
    firstName: "Aidan",
    lastName: "Johnson",
    password: "1234",
    company: "Whole Foods",
    security_question: "woodchuck",
    security_answer: "1234",
    email: "test@gmail.com",
    is_seller: false,
    is_admin: true

})

  await Product.create({ 
    name: "glasses1",
    gender: "male",
    material: "plastic",
    frame: "square",
    size: "xs",
    type: "reading",
    price: 199.99
  })

  await Product.create({ 
    name: "glasses2",
    gender: "female",
    material: "metal",
    frame: "round",
    size: "m",
    type: "progressive",
    price: 99.99
  })

  await Product.create({ 
    name: "glasses3",
    gender: "children",
    material: "plastic",
    frame: "oval",
    size: "xs",
    type: "reading",
    price: 59.99
  })

  await Product.create({ 
    name: "glasses4",
    gender: "male",
    material: "plastic",
    frame: "square",
    size: "xs",
    type: "reading",
    price: 1999.99
  })
}


sequelize.sync({ force: true}).then(() =>{
  console.log("Database Initalized!")
  setup()
})

module.exports = app;
