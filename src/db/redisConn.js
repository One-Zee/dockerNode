const redis = require('redis');
const { REDIS_PORT , REDIS_URL } = require('../config/config')

const redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

redisClient.on('connect',async ()=>{
    console.log('connected to redis client...');
}) 
/
redisClient.on('error',(err)=>{
    console.log("redis ERORR --> "+ err);
})

module.exports = redisClient;