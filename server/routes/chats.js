import express from 'express'
const router = express.Router();
import MernChat from '../models/dbMessages.js'

router.get("/", async (req, res) => {
    try {
        const chats = await MernChat.find({})
        res.json(chats)
    } catch (err) {
        res.json(err)
    }
})

router.post('/new', async (req, res) => {

    try {
        const newChat = await MernChat.create(req.body)
        res.status(200).send(newChat)

    } catch (err) {
        res.json(err)
    }
})

router.get("/:id", async (req, res) => {
  try {
      const singleChat = await MernChat.find({
          _id: req.params.id
      })
      res.send(singleChat)
  } catch (err) {
      res.send(err)
  }
})

export default router