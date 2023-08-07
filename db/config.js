const mongoose=require("mongoose");
// mongoose.connect("mongodb://localhost:27017/learning")
mongoose.connect("mongodb+srv://rohitsinghbigahi:Ro%40050804@medicare.s1ccazc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true
})