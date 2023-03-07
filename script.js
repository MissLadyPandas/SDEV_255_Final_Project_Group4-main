const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const coursesRoutes = require('./routes/coursesRoutes');

//express app
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//connect to mongodb
const dbURI ='mongodb+srv://kbrumback:test1234@cluster0.kpdgknd.mongodb.net/FinalProject?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((err) => console.log(err));

// mongoose and mongo sandbox routes
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// home page reroute
app.get('/', (req, res) => {
    res.redirect('/home');
});

// home page route
app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' });
});

// courses page route
app.use('/courses', coursesRoutes);

// create page route
app.get('/create', (req, res) => {
    res.render('create', { title: 'Create Course' });
});

// new user route
app.get('/login_create', (req, res) => {
  res.render('login_create', { title: 'New User' });
});

// about page route
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// contact page route
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

// login page route
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// shopping cart route
app.get('/cart', (req, res) => {
    res.render('cart', { title: 'Shopping Cart' });
});

// confirmation route
app.get('/confirmation', (req, res) => {
    res.render('confirmation', { title: 'Confirmation' });
});

// shop route
app.get('/shop', (req, res) => {
    res.render('shop', { title: 'Shop' });
});

// 500 page - this HAS to be near the bottom of the page otherwise express will match based on per list item
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: '500' });
  });

// 404 page - this HAS to be at the bottom of the page otherwise express will match based on per list item
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
