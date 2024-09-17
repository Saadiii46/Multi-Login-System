const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true},
    department: {type: String, required: true},
    phone: {type: String, required: true},

})

const staffModel = new mongoose.model('staff', staffSchema);

module.exports = staffModel;