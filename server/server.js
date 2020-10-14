import express from 'express'
import { connectDB } from './db/db.js'
import chatRouter from './routes/chats.js'
import authRouter from './routes/auth.js'
import cors from 'cors'

const PORT = process.env.PORT || 5000
const app = express()

// middleware
// we can now accept info from req.body and limit incoming file size to 5mb
app.use(express.json({ extended: false, limit: '5mb' })); 
app.use(cors())
app.use(express.json({ extended: false })); // we can now accept info from req.body

//connect to DB
connectDB()


//api routes
app.use('/api/chats', chatRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
})