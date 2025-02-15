const {Schema,model} = require("mongoose");
const { applyTimestamps } = require("./blog");

const commentSchema = new Schema({
  comment:{type:String,required:true},
  createdBy:{type:Schema.Types.ObjectId, ref:"user"},
  createdAt:{type:Schema.Types.ObjectId, ref:"blog"}  
},{timestamps:true});

const Comment = model("comment",commentSchema)
module.exports=Comment;