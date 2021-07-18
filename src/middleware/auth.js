const jwt = require("jsonwebtoken");
const Register = require("../models/userRegistrations");

const auth = async (req,res, next) => {
   try {
       const token = req.cookies.haseebForm;
       const verifyUserWithToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
       const user = await Register.findOne({_id: verifyUserWithToken._id});
       req.token = token;
       req.user = user
       next();
   } catch (error) {
       res.status(400).send(`error form auth - ${error.message}`)
   }
}
module.exports = auth;