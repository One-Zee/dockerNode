const mongoose = require('mongoose');

//mongoose.connect('mongodb://username:password@host:port/database?options...');
mongoose.connect('mongodb://one_zee:password1@mongo:27017/?authSource=admin',{ useNewUrlParser: true , useUnifiedTopology: true},(err)=>{
    if(!err){
        console.log("connected to mongodb..")
    }else{
        console.log("not connected...");
    }
});