// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const auth = require('./auth');
const passport = require('passport');
const session = require('express-session');
const PORT = process.env.PORT;

// middleware function
function isLoggedin(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

// app initialization and middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(session({
    secret: 'coder',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

// Routes
app.get('/', (req, res) => {
    res.send(`<h1>Backend is running</h1>`);
})

app.post('/api/login', (req, res) => {
    const { email } = req.body;
    const userInfo = { Email: email }
    console.log(userInfo);
    res.json({ msg: 'User data saved', userData: userInfo });
})

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/google/failure'
}));

app.get('/auth/success', isLoggedin, (req, res) => {
    const user = req.user;
    const { displayName, email, picture } = user;
    const userInfo = { displayName, email, picture };
    console.log(userInfo);
    res.redirect('http://localhost:3000/SuccessPage');
})

app.get('/auth/google/failure', (req, res) => {
    res.send(`Some error occured`);
})