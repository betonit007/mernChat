import express from 'express'
const router = express.Router();
import MernChat from '../models/dbMessages.js'
import Room from '../models/Room.js'
import cloudinary from 'cloudinary'

import { auth } from '../middleware/auth.js'; 

router.get("/populate/:id", async (req, res) => {
  
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

router.post('/image', auth, async (req, res) => {

	try {
		//const secret = await getSecret()

		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME || secret.cloudinary_cloud_name,
			api_key: process.env.CLOUDINARY_API_KEY || secret.cloudinary_api_key,
			api_secret: process.env.CLOUDINARY_SECRET || secret.cloudinary_secret
		})

		cloudinary.uploader.upload(
			req.body.image,
			async (result) => {

				if (result.error) return res.json({ error: result.error })

				res.send({
					//url: result.url,
					photoUrl: result.secure_url,
					public_id: result.public_id
				});
			},
			{
				public_id: `${Date.now()}`, // public name
				resource_type: 'auto' // JPEG, PNG
			}
		);

	} catch (error) {
		console.log(error)
		res.json(error)
	}
})

router.delete('/image', auth, async (req, res) => {

	try {

		let image_id = req.body.public_id

		cloudinary.uploader.destroy(image_id, (error, result) => {
			if (error) {
				res.json({ success: false, error })
			} else {
				res.json(result)
			}
		})

	} catch (error) {
		console.log(error)
		res.json(error)
	}

})




export default router