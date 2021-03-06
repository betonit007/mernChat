//middleware - function that has access to the req and response cycle / object
const jwt = require('jsonwebtoken')
const getSecret = require("../config/secrets.js") //GOOGLE SECRETS

module.exports = async (req, res, next) => {  // next just moves on to next middleware
  //Get token from header
  const token = req.header('x-auth-token') //x-auth-token is the key to token in the header
  
  //Check if not token
  if(!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  //then if there is a token, we need to verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || await getSecret().then(secret => secret.JWT_SECRET)); // pass in token and 'jwtSecret' to verify token
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
