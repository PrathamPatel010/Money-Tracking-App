const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const response = await mongoose.connect(process.env.DB_URI);
        console.log(`Database connected: ${response.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connectDB };