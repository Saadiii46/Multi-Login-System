const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    rollNo: {type: String, required: true},

})

const studentModel = new mongoose.model('student', studentSchema);

module.exports = studentModel;