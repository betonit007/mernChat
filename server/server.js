import express from 'express'
import { connectDB } from './db/db.js'
import chatRouter from './routes/chats.js'
import cors from 'cors'

const PORT = process.env.PORT || 5000
const app = express()

// middleware
app.use(express.json({ extended: false })); // we can now accept info from req.body
app.use(cors())

//connect to DB
connectDB()

//api routes
app.use('/api/chats', chatRouter)

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
})