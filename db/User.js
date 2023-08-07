const mongoose=require('mongoose');
const bcrypt =require('bcrypt');

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cpassword:String
});

// hashing of password*************
// userSchema.pre('save',async function(next){
//    try{
//     const salt =await bcrypt.genSalt(10);
//     this.password=await bcrypt.hash(this.password,salt);
//     this.cpassword=await bcrypt.hash(this.cpassword,salt);
//     next();
//    }
//    catch(error){
//     next(error);
//    }
// })

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10);
        this.cpassword=await bcrypt.hash(this.cpassword,10);
    }
    next();
})

module.exports=mongoose.model("users",userSchema);

