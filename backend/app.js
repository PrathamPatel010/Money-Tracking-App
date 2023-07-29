// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');


// app initialization and middlewares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})



// Routes
app.get('/', (req, res) => {
    res.send(`<h1>Backend is running</h1>`);
})

app.post('/api/saveuser', (req, res) => {
    const { name, password, email } = req.body;
    const userInfo = { name, password, email };
    console.log(userInfo);
    res.json({ msg: 'User data saved', userData: userInfo });
})