const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')
const getSecret = require('../config/secrets.js')

dotenv.config()

//const getSecret = require("../config/secrets")
const auth = require('../middleware/auth') //bring in to verify token

const User = require('../models/User.js')

router.get('/', auth, async (req, res) => {

	try {
		const user = await User.findById(req.user).select('-password') //.select - do not return password enough though its encrypted
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


router.post('/login', async (req, res) => {

	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email }); //check to see if user exists in db (search by email)

		if (!user) {
			return res.status(400).json({ msg: 'Invalid Credentials' }) // if user doesn't exist send error
		}

		const isMatch = await bcrypt.compare(password, user.password); //use bycrypt to see if password returned from database matches password entered by user

		if (!isMatch) { // if no match send error back to user
			return res.status(400).json({ msg: 'Invalid Credentials' })
		}

		// run below if there is a match
		jwt.sign({ user: user._id }, process.env.JWT_SECRET || await getSecret().then(secret => secret.JWT_SECRET), { //pass in an object with user id to create webtoken with jsonwebtoken
			expiresIn: 36000                                         // a secret must also be passed into sign (it can be whatever you want (store in config.get() from config npm))
		}, (err, token) => {
			if (err) throw err;
			res.json({ token })
		})
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post('/newuser', async (req, res) => {

	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });  //check to see if username is already taken
		if (user) {

			return res.status(400).json({ msg: 'User already exists' });
		}

		user = new User({ //create new user in DB since above came back false
			name: name,
			email: email,
			password: password
		});

		const salt = await bcrypt.genSalt(10) //create salt (used to encrypt password with bcrypt) with method genSalt 10 is encryption level

		user.password = await bcrypt.hash(password, salt); //reassign user.password with bcrypt.hash to a hash version of password.

		await user.save(); // save incrypted user info to mongo db

		jwt.sign({ user: user._id },  process.env.JWT_SECRET || await getSecret().then(secret => secret.JWT_SECRET), { //pass in an object with user id to create webtoken with jsonwebtoken
			expiresIn: 3600000                                       // a secret must also be passed into sign (it can be whatever you want (store in config.get() from config npm))
		}, (err, token) => {
			if (err) throw err;
			res.json({ token })
		})
	} catch (err) {
		console.error(err.message);
		res.status(500).send(err);
	}
});

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

				await User.findOneAndUpdate(
					{ _id: req.user },
					{
						$set: {
							public_id: result.public_id,
							photoUrl: result.secure_url
						}
					})
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

module.exports = router;