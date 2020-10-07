import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const mernChatSchema = new Schema({
    message: String,
    name: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    userId: Schema.Types.ObjectId,
    roomId: Schema.Types.ObjectId,
    received: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("MernChat", mernChatSchema)