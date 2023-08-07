const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
   phone:String,
   college:String,
   address:String,
   username:String,
   linkedin:String,
   facebook:String,
   git:String,
   twitter:String,
   p1name:String,
   p2name:String,
   workp1name:String,
   workp2name:String,
   projectd1:String,
   projectd2:String,
   workdisc1:String,
   workdisc2:String,
   postImage:String



})

module.exports=mongoose.model("userdetail",userSchema);