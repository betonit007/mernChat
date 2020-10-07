const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ["user", "admin", "root"] 
    },
    date: {
        type: Date,
        default: Date.now
    },
    ///ref/link to a user saved car inventory
    savedCars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MernChat"
    }]
});

module.exports = mongoose.model('user', UserSchema);