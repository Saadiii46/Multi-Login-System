const mongoose = require("mongoose");
const {databaseModel, staffDatabaseModel} = require("../models/database-model");
const MongoClient = require('mongodb').MongoClient;
const jwt = require("jsonwebtoken");

const registration = async(req, res) => {

    const {username, email, schoolName, phone, password} = req.body;

    if(!username || !email || !schoolName || !phone || !password) {
        return res.status(400).json({message: 'Missing required fields'});
    }

    try {

        const mongoURI = 'mongodb://localhost:27017/';
        const client = new MongoClient(mongoURI);
        await client.connect();
        const admin = client.db().admin();
        const databases = await admin.listDatabases();


        const databaseExists = databases.databases.some(db => db.name === username);


        if(databaseExists) {
            return res.status(400).json({message: 'Database with this username already exist'});

        }

        const dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${username}`);


        const sanitizeCollectionName = schoolName.replace('/[^a-zA-Z0-9]/g', '_');


        const userModel = databaseModel(sanitizeCollectionName); // Collection created


        if(!userModel) {
            return res.status(400).json({message: 'Failed to create user collection'});
        }


        const newUser = new userModel({username, email, schoolName, phone, password});  // Insertig data in the collection

        const savedUser = dbConnection.collection(schoolName).insertOne(newUser);  // Saving data in the collection

        // Generating token when user registered
        const token = jwt.sign({ username: savedUser.username, id: savedUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });  

        return res.status(201).json({message: 'User registered successfully', data: newUser, token});

    } catch (error) {
        console.error('Error registering user', error.message);
        return res.status(400).json({message: 'Internel server error'});
    }
}

module.exports = { registration}