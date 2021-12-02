const express = require('express');
require('./src/db/mongooseConn')

const app = express();

app.get('/',(req,res)=>{
    res.send('<h1>Hi There</h1>')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Listening on port ' + PORT + '...');
})