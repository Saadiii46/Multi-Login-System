const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const URI = "mongodb://localhost:27017/";
        await mongoose.connect(URI);
        console.log('Connected to default database');
    } catch (error) {
        console.error('Error connecting to database', error.message);
        throw new Error('Database connection error');
    }
}

module.exports = connectDB;