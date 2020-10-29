const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const mernChatSchema = new Schema({
    message: String,
    name: String,
    pic: [{
        photoUrl: String,
        public_id: String
    }],
    timestamp: {
        type: Date,
        default: Date.now
    },
    userId: Schema.Types.ObjectId,
    roomId: Schema.Types.ObjectId,
    photo: String
})

module.exports = mongoose.model("MernChat", mernChatSchema)