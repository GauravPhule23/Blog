const path = require("path")
const express = require("express")
const mongoose  =require("mongoose")
const cookieParser = require("cookie-parser")
const checkForAuthenticationCookie = require("./Midleware/authentication")

const userRoutes = require("./Routes/user")
const blogRoutes = require("./Routes/blog")

const Blog = require("./Models/blog")

const app=express()
const PORT = 8000;
mongoose.connect("mongodb://localhost:27017/blog").then((e)=>{
  console.log("mongoDB conected ...")
})

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public"))) //tells the server that this folder to be rendered staticallyS

app.set("view engine","ejs")
app.set("Views","./Views")

app.use("/user",userRoutes)
app.use("/blog",blogRoutes)

app.get("/",async (req,res)=>{
  const allBlog = await Blog.find({})
  res.render("home",{
    user:req.user,
    blogs:allBlog
  })
})

app.listen(PORT,()=>{
  console.log(`Server started on port : ${PORT}`)
});