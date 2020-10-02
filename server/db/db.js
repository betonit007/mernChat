import mongoose from 'mongoose'
import Pusher from 'pusher'
import dotenv from 'dotenv'
dotenv.config()

const pusher = new Pusher({
    appId: process.env.PUSHER_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'mt1',
    encrypted: true
});

export const connectDB = async () => {

    try {

        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        const db = mongoose.connection;

        db.once("open", () => {
            console.log("MONGODB connected")
            const chatCollection = db.collection("mernchats"); //"mernchats" is the name of the model we created in folder (./models/dbMessages.js)
            const changeStream = chatCollection.watch()

            changeStream.on("change", (change) => {
                console.log(change)
                if (change.operationType === 'insert') { // a field in change object (passed in)
                    const messageDetails = change.fullDocument;
                    
                    pusher.trigger("messages", "inserted", { //first argument must match the pusher.subscribe("messages") on front end. 
                        name: messageDetails.name,
                        message: messageDetails.message,
                        timestamp: messageDetails.timestamp,
                        received: messageDetails.received,
                        roomId: messageDetails.roomId
                    })
                } else { console.log("Error triggering pusher") }
            })
        })

    } catch (error) {
        console.error("ERROR connecting MONGODB", error)
    }

}


