const MongoClient = require('mongodb').MongoClient;
const jwt = require("jsonwebtoken");
require('dotenv').config();
const dashboard = require("../controllers/dashboard-controller"); 

const login = async (req, res) => {

    const { username, password, schoolName } = req.body;

    try {
        const mongoURI = 'mongodb://localhost:27017/';
        const client = new MongoClient(mongoURI);
        await client.connect();

        const admin = client.db().admin();
        const databases = await admin.listDatabases();
        const databaseExists = databases.databases.some(db => db.name === username);

        if (!databaseExists) {
            return res.status(404).json({ message: 'User not found or invalid credentials' });
        }
        
        const db = client.db(username);

        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(col => col.name === schoolName);

        if (!collectionExists) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        const collection = db.collection(schoolName);

        const user = await collection.findOne();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(!schoolName) {
            return res.status(404).json({message: 'School name not found'});
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate token when user loged in
        const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        

        // Display token with message login successful 
        return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };
