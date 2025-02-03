const {createHmac, randomBytes} = require("crypto")
const {Schema,model} = require("mongoose");
const { createTokenForUser } = require("../service/authentication");

const userSchema = new Schema({
  fullName:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  salt:{type:String},
  password:{type:String,required:true},
  profileURL:{type:String,required:true,default:"/images/default.jpg"},
  role:{type:String,enum:["USER","ADMIN"],default:"USER"}
},{timestamps:true});

/*    We have a built in function called schema.pre("save",cb(next))
  which process the data before saving it to the database. Here below we are implementing a hashing of password
  using salt method.

    here we will use crypto lib for hashing in this we will use createHmac() function.

    syntax:
        const var = createHmac("Algo-name",SecreteKey)

    We will also use randomBytes function to create secretrKey here called as salt.

      salt = randomBytes(n).toString();
        n = no. of digits
*/

userSchema.pre("save",async function (next){
  const user = this;
  if(!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");

  this.salt=salt;
  this.password=hashedPassword;

  next();
})

userSchema.static("matchHashAndGenerateToken",async function(email,password){
  const user = await this.findOne({email})
  if(!user) throw new Error("No user found")
  const hashedPassword = user.password
  const userHash  = createHmac("sha256",user.salt).update(password).digest("hex");
 

  if(userHash !== hashedPassword) throw new Error("Incorrect Password")
  const token = createTokenForUser(user);
  return token;
})


const User = model("user",userSchema);

module.exports = User;