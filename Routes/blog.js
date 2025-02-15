const {Router} = require("express")
const multer  = require('multer')
const Blog = require("../Models/blog")
const Comments = require("../Models/comments")
const path = require("path")
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"))
  },
  filename: function (req, file, cb) {
    const fileName=`${Date.now()}-${file.originalname}`
    cb(null,fileName )
  }
})

const upload = multer({ storage: storage })



router.get("/add-new",(req,res)=>{
  res.render("addBlog",{
    user:req.user,
  })
})
router.get('/:id',async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy")
 
  const commentId2 = await Comments.find({createdAt:req.params.id}).populate("createdBy")
 
  res.render("blog",{
    blog,
    user:req.user,
    commentId2,
  })
})
router.post("/add-new",upload.single("coverImage"),async (req,res)=>{
  const {title, body} = await req.body
  const blogData = {
    title,
    body,
    createdBy:req.user._id,
    
  }
  if(req.file){
    blogData.coverImageURL = `/uploads/${req.file.filename}`
  }
  const blog = await Blog.create(blogData)
  res.redirect(`/blog/${blog._id}`)
})

// Handeling Comments

router.post("/comment/:id",async (req,res)=>{
  await Comments.create({
    comment : req.body.comment,
    createdBy: req.user._id,
    createdAt: req.params.id
  })
  res.redirect(`/blog/${req.params.id}`)
})

module.exports = router