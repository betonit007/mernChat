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
            const chatCollection = db.collection("mernchats");
            const changeStream = chatCollection.watch()

            changeStream.on("change", (change) => {
                console.log('A CHANGE OCCURRED', change)

                if (change.operationType === 'insert') { // a field in change object (passed in)
                  const messageDetails = change.fullDocument;
                  pusher.trigger("messages", "inserted", {
                      name: messageDetails.user,
                      message: messageDetails.message
                  })
                }
            })
        })

    } catch (error) {
        console.error("ERROR connecting MONGODB")
        console.error(error)
    }


    // mongoose.connect(process.env.MONGO_URI, {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useFindAndModify: true
    // })
    // .then(() => {
    //     console.log('Car Database Connected!')

    // })
    // .catch(err => {
    //     console.log(err.message);
    //     process.exit(1);
    // })
}


