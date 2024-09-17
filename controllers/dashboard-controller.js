const mongoose = require("mongoose");
const staffModel = require("../models/staff-model");
const studentModel = require("../models/student-model");

// Add Staff Data
const staffData = async (req, res) => {
    const { username } = req.params;
    const { name, email, department, phone } = req.body;
    let dbConnection;

    try {
        // Establish a connection to the specific user's database
        dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${username}`);

        // Create a new staff instance
        const Staff = dbConnection.model('Staff', staffModel.schema); // Bind staffModel to the connection
        const newStaff = new Staff({ name, email, department, phone });

        // Insert the new staff data into the staff collection
        const savedStaff = await newStaff.save();

        return res.status(200).json({ message: 'Staff data saved successfully', data: savedStaff });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error saving staff data' });
    } finally {
        // Close the DB connection after operation
        if (dbConnection) {
            dbConnection.close();
        }
    }
};

// Fetch Staff Data
const getStaffData = async (req, res) => {
    const { username } = req.params;
    let dbConnection;

    try {
        // Establish a connection to the specific user's database
        dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${username}`);

        // Reuse the staff model from the connected database
        const Staff = dbConnection.model('Staff', staffModel.schema);

        // Fetch all staff data
        const staffData = await Staff.find({});

        if (!staffData.length) {
            return res.status(404).json({ message: 'No staff data found' });
        }

        // Respond with the fetched staff data
        return res.status(200).json({ data: staffData });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error fetching staff data' });
    } finally {
        // Close the DB connection after operation
        if (dbConnection) {
            dbConnection.close();
        }
    }
};

const deleteStaff = async (req, res) => {
    const { username, id } = req.params;
    let dbConnection;

    try {
        // Establish a connection to the specific user's database
        dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${username}`);

        // Reuse the staff model from the connected database
        const Staff = dbConnection.model('Staff', staffModel.schema);

        // Fetch all staff data
        const staffData = await Staff.deleteOne({_id: id});

        // Respond with the fetched staff data
        return res.status(200).json({ message: 'Staff deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error deleting staff data' });
    } finally {
        // Close the DB connection after operation
        if (dbConnection) {
            dbConnection.close();
        }
    }
};

const studentData = async(req ,res) => {

    const {username} = req.params;
    const {name, email, phone, rollNo} = req.body;
    let dbConnection;

    try {
        
        dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${username}`);

        const student = dbConnection.model('student', studentModel.schema);

        const newStudent = new student({name, email, phone, rollNo});

        const savedStudent = await newStudent.save();

        return res.status(200).json({message: 'Student data added successfully', data: savedStudent});

    } catch (error) {
        
        console.error(error.message);
        return res.status(200).json({message: 'Failed to add student data'});

    }finally {
        // Close the DB connection after operation
        if (dbConnection) {
            dbConnection.close();
        }
    }

}

const getStudentData = async(req, res) => {

    const {username} = req.params;
    let dbConnection;

    try {
        
        dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${username}`);

        const student = dbConnection.model('student', studentModel.schema);

        const studentData = await student.find({});

        return res.status(200).json({message: 'Student data', studentData});

    } catch (error) {
        
        console.error(error.message);
        return res.status(404).json({message: 'Failed to get student data'});

    }finally {
        // Close the DB connection after operation
        if (dbConnection) {
            dbConnection.close();
        }
    }


}
const deleteStudentData = async(req, res) => {

    const {username, id} = req.params;
    let dbConnection;

    try {
        
        dbConnection = mongoose.createConnection(`mongodb://localhost:27017/${username}`);

        const student = dbConnection.model('student', studentModel.schema);

        const studentData = await student.deleteOne({_id: id});

        return res.status(200).json({message: 'Student data deleted successfully'});

    } catch (error) {
        
        console.error(error.message);
        return res.status(404).json({message: 'Failed to delete student data'})

    }finally {
        // Close the DB connection after operation
        if (dbConnection) {
            dbConnection.close();
        }
    }


}

module.exports = { staffData, getStaffData, studentData, getStudentData, deleteStaff, deleteStudentData };
