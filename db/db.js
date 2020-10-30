const mongoose = require('mongoose')
const Pusher = require('pusher')
const dotenv = require('dotenv')
const getSecret = require('../config/secrets.js')
dotenv.config()

const connectDB = async () => {

    const pusher = new Pusher({
        appId: await getSecret().then(secret=>secret.PUSHER_ID),
        key: await getSecret().then(secret=>secret.PUSHER_KEY),
        secret: await getSecret().then(secret=>secret.PUSHER_SECRET),
        cluster: 'mt1',
        encrypted: true
    });

    try {

        mongoose.connect(await getSecret().then(secret=>secret.MONGO_URI), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        const db = mongoose.connection;

        db.once("open", () => {
            console.log("MONGODB connected")
            const chatCollection = db.collection("mernchats"); //"mernchats" is the name of the model we created in folder (./models/dbMessages.js)
            const changeChats = chatCollection.watch()

            changeChats.on("change", (change) => {
                
                if (change.operationType === 'insert') { // a field in change object (passed in)
                    const {name, message, timestamp, received, roomId, userId, pic } = change.fullDocument;
                    
                    pusher.trigger("messages", "inserted", { //first argument must match the pusher.subscribe("messages") on front end. 
                        name,
                        message,
                        timestamp,
                        received,
                        roomId,
                        userId,
                        pic
                    })
                } else { console.log(change, "Error triggering pusher in messages") }
            })

            const roomCollection = db.collection("rooms"); //"mernrooms" is the name of the model we created in folder (./models/dbMessages.js)
            const changeRooms = roomCollection.watch()

            changeRooms.on("change", (change) => {
                
                if (change.operationType === 'insert') { // a field in change object (passed in)
                    const messageDetails = change.fullDocument;

                    
                    pusher.trigger("rooms", "inserted", { //first argument must match the pusher.subscribe("messages") on front end. 
                        name: messageDetails.name,
                        creatorInfo: messageDetails.creatorInfo,
                        _id: messageDetails._id
                    })
                } else { console.log(change, "Error Room") }
            })
        })

    } catch (error) {
        console.error("ERROR connecting MONGODB", error)
    }

}

module.exports = connectDB
