import mongoose from 'mongoose'

const mernChatSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("MernChat", mernChatSchema)