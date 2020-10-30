const express = require('express')
const path = require('path')
const connectDB = require('./db/db')
const chatRouter = require('./routes/chats.js')
const authRouter = require('./routes/auth.js')
//const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()

//connect to DB
connectDB()


// we can now accept info from req.body and limit incoming file size to 5mb
app.use(express.json({ extended: false, limit: '5mb' }));
// GOOGLE CLOUD DEPLOY
app.use(express.static(path.join(__dirname, "/client/build")))

//app.use(cors())
//api routes
app.use('/api/chats', chatRouter)
app.use('/api/auth', authRouter)

//GOOGLE CLOUD DEPLOY PART 2
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
})

// GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Tim\dev\MERN\credsFolder\mernpusherchat.json" nodemon server.js