import express from 'express'
const router = express.Router();
import MernChat from '../models/dbMessages.js'
import Room from '../models/Room.js'

router.get("/populate/:id", async (req, res) => {
    console.log(req.params.id)
    Room.find({ _id: req.params.id })
        .populate("chats")
        .then(roomWithChats => {
            res.json(roomWithChats);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/rooms", async (req, res) => {
    try {
        const rooms = await Room.find({}).sort({ date: -1 })
        res.json(rooms)
    } catch (err) {
        res.json(err)
    }
})

router.post("/newroom", async (req, res) => {
    try {
        const newRoom = await Room.create(req.body)
        res.json(newRoom)
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

router.post("/new", async (req, res) => {

    const { message, name, roomId, userId, pic } = req.body
    
    try {
        const { _id } = await MernChat.create(
            {
                message,
                pic,
                name,
                userId,
                roomId: roomId.id
            }
        )
        //Push new room to rooms array and update lastUpdate with current time / date
        const response = await Room.findOneAndUpdate({ _id: roomId.id }, { $set: { lastUpdated: Date.now() }, $push: { chats: _id } })

        res.json(response)
        // MernChat.create({ message: "First one using populate (mongoose)", name: "Tim", timestamp: "hi" })
        // .then(({ _id }) => Room.findOneAndUpdate({ _id: "5f74e274457976435871096c" }, { $push: { chats: _id } }, { new: true }))
        // .then(resp => console.log(resp))

    } catch (error) {
        console.log(error)
        res.json("BIG ERROR", error)

    }
})



export default router