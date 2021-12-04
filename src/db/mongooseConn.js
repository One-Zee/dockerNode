const mongoose = require('mongoose');
const { MONGO_IP , MONGO_PASSWORD , MONGO_USER , MONGO_PORT } = require('../../config/config');
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () =>{
    //mongoose.connect('mongodb://username:password@host:port/database?options...');
    mongoose.connect(mongoURL,{ useNewUrlParser: true , useUnifiedTopology: true},(err)=>{
        if(!err){
            console.log("connected to mongodb..")
        }else{
            console.log("not connected...");
            setTimeout(connectWithRetry,5000)
        }
    });
    
}

connectWithRetry();