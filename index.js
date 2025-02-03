const path = require("path")
const express = require("express")
const mongoose  =require("mongoose")

const userRoutes = require("./Routes/user")

const app=express()
const PORT = 8000;
mongoose.connect("mongodb://localhost:27017/blog").then((e)=>{
  console.log("mongoDB conected ...")
})

app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs")
app.set("Views","./Views")

app.use("/user",userRoutes)

app.get("/",(req,res)=>{
  res.render("home")
})

app.listen(PORT,()=>{
  console.log(`Server started on port : ${PORT}`)
});