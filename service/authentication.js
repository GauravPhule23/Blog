const JWT = require("jsonwebtoken")
// const User = require("../Models/user")

const SecretKey = "asdnjksnkjsahu";

async function createTokenForUser(user){
  const payload ={
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileURL,
    role: user.role,
  };
  const token = await JWT.sign(payload,SecretKey)
  return token;
}

function validateToken(token){
  const payload=JWT.verify(token,SecretKey)
  return payload;
}

module.exports={
  createTokenForUser,
  validateToken,
}