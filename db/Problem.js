const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    type:String,
    name:String,
    statement:String,
    ans:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    status:String,
    level:String,
    hint:String,
    solvers:Array,
    topic:String,
    comments:Array,
    starlist:Array
})

module.exports=mongoose.model("problems",userSchema);
// need some optimisation