const mongoose = require("mongoose");

function databaseModel (schoolName) {
    try {

        if(mongoose.models[schoolName]){
            return mongoose.models[schoolName]
        }

        const registrationSchema = new mongoose.Schema({
            username: {type: String, required: true},
            email: {type: String, required: true},
            schoolName: {type: String, required: true},
            phone: {type: String, required: true},
            password: {type: String, required: true}

        })

        return mongoose.model(schoolName, registrationSchema);

    } catch (error) {
        console.error('Error creating model :', error.message);
        return null;
    }
}
 
module.exports = {databaseModel}