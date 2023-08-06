// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const auth = require('./auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const secret = process.env.secret;
const session = require('express-session');
const mongoose = require('mongoose');
const { connectDB } = require('./database/db');
const PORT = process.env.PORT;
const User = require('./database/User');
const Transaction = require('./database/Transaction');
const { authenticate } = require('passport');
const frontend_url = process.env.FRONTEND_URI;

// middleware function
function isLoggedin(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

// app initialization and middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
    origin: frontend_url,
    credentials: true,
};
app.use(cors(corsOption));
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

app.post('/api/login', async(req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
        res.json({ success: false, error: 'No registered user found' });
        return;
    }
    const passOk = await bcrypt.compare(password, findUser.password);
    if (!passOk) {
        res.json({ success: false, error: 'Wrong E-mail OR password' });
        return;
    }
    jwt.sign({ id: findUser._id, email: findUser.email }, secret, (err, token) => {
        if (token) {
            res.cookie('token', token).json({ success: true, id: findUser._id, email: findUser.email });
        } else {
            console.log(err);
        }
    });
})

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/success?email=:email',
    failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/failure', (req, res) => {
    res.send(`Some error occured`);
})

app.get('/auth/success', isLoggedin, async(req, res) => {
    try {
        const user = req.user;
        const { displayName, email, picture } = user;
        const userData = {
            email,
            name: displayName,
            imgURL: picture,
            password: 'notset',
            passwordSet: false,
        };
        const createdUser = await User.create(userData);
        console.log(createdUser);
        res.redirect(`http://localhost:3000/SuccessPage/${email}`);
    } catch (err) {
        console.log(err);
    }
})


app.post('/api/setPassword', async(req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.json({ msg: "You are not registered" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const getUser = await User.findOneAndUpdate({ email }, { "$set": { "password": hashedPassword, "passwordSet": true } }, { new: true });
        res.json({ getUser });
    } catch (err) {
        console.log(err);
    }
})

app.post('/api/checkPasswordStatus', async(req, res) => {
    try {
        const { email } = req.body;
        const getUser = await User.findOne({ email });
        res.json({ passwordSet: getUser.passwordSet });
    } catch (err) {
        console.log(err);
    }
})

app.post('/api/transaction', async(req, res) => {
    const { expense, description, datetime } = req.body;
    try {
        const payload = jwt.verify(req.cookies.token, secret);
        const response = await Transaction.create({ expense, description, datetime, user: payload.id });
        console.log(response);
        res.json(response);
    } catch (err) {
        console.log(err);
    }
})

app.get('/api/transactions', async(req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, secret);
        const transactions = await Transaction.find({ user: new mongoose.Types.ObjectId(payload.id) }).select('expense description datetime -_id');
        res.json(transactions);
    } catch (err) {
        console.log(err);
    }
})

app.delete('/api/clearTransactions', async(req, res) => {
    try {
        const payload = jwt.verify(req.cookies.token, secret);
        await Transaction.deleteMany({ user: payload.id });
        res.json({ success: true, msg: "User Transactions cleared" });
    } catch (err) {
        console.log(err);
    }
})