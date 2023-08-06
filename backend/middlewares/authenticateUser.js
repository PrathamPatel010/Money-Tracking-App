const jwt = require('jsonwebtoken');
const secret = 'pratham123';

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        // no token found
        res.redirect('/');
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.redirect('/');
        } else {
            req.user = decoded;
            next();
        }
    });
};

module.exports = { authenticateUser };