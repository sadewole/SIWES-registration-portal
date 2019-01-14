let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let studentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    matric: {
        type: String,
        required: true
    },
    school:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    supervisor:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    enddate:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema)