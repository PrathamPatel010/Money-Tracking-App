// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const auth = require('./auth');
const session = require('express-session');
const { connectDB } = require('./database/db');
const PORT = process.env.PORT;
const User = require('./database/User');

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

// Connecting to database
try {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
} catch (err) {
    console.log(err);
}


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

app.get('/auth/success', isLoggedin, async(req, res) => {
    try {
        const user = req.user;
        const { displayName, email, picture } = user;
        const userData = {
            email,
            name: displayName,
            imgURL: picture,
        };
        const createdUser = await User.create(userData);
        console.log(createdUser);
        res.redirect('http://localhost:3000/SuccessPage');
    } catch (err) {
        console.log(err);
    }
})

app.get('/auth/google/failure', (req, res) => {
    res.send(`Some error occured`);
})