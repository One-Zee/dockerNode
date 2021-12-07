const express = require('express');
require('./src/db/mongooseConn')
const session = require('express-session');
let RedisStore = require('connect-redis')(session)
const client = require('./src/db/redisConn');
const { SESSION_SECRET } = require('./src/config/config');

const app = express();


app.use(session({
    store: new RedisStore({client: client}),
    secret: SESSION_SECRET,
    cookie:{
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true, //javascript on browser side will not be able to access it
        maxAge: 30 * 1000 // 30 sec
    }
}))

app.use(express.json())

/**
 *  Get routes
 */
const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes');

/**
 * Implement routes
 */
app.use('/api/posts/',postRoutes);
app.use('/api/',authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Listening on port ' + PORT + '...');
})