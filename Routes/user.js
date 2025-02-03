const {Router} = require("express")
const User =  require("../Models/user")

const router = Router();

router.post("/signUp",async (req,res)=>{
  const {fullName, email, password} = await req.body;
  await User.create({
    fullName,
    email,
    password
  })
  return res.redirect("/")
});

router.get("/signUp",(req,res)=>{
  res.render("signup")
});
router.post("/signin",async (req,res)=>{
  const {email, password} = await req.body;
 try {
  const token = await User.matchHashAndGenerateToken(email,password);
  return res.cookie("token",token).redirect("/")
 } catch (error) {
  return res.render("signin",{
    error:"Incorrect Password"
  })
 }
});

router.get("/signin",(req,res)=>{
  res.render("signin")
});

module.exports=router