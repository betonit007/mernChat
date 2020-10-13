import mongoose from 'mongoose'

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
        required: true,
        minlength: 6,
        
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
    photoUrl: {
        type: String,
        default: null
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MernChat"
    }]
});

export default  mongoose.model('User', UserSchema);