const express = require('express')
const router = express.Router();
const MernChat = require('../models/dbMessages.js')
const Room = require('../models/Room.js')
const cloudinary = require('cloudinary')
const getSecret = require('../config/secrets.js')
const auth = require('../middleware/auth.js')

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

router.post("/newroom", auth, async (req, res) => {
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

router.post("/new", auth, async (req, res) => {

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
		const secret = await getSecret()

		cloudinary.config({
			cloud_name: secret ? secret.CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
			api_key: secret ? secret.CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
			api_secret: secret ? secret.CLOUDINARY_SECRET : process.env.CLOUDINARY_SECRET
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

router.post('/removeimage', auth, async (req, res) => {
    console.log(req.body.public_id)
	try {

		cloudinary.uploader.destroy(req.body.public_id, (result) => {
			if (result.error) {
				res.json({ error: result.error })
			} else {
				res.json(result)
			}
		})

	} catch (error) {
		console.log(error)
		res.json(error)
	}

})

module.exports = router