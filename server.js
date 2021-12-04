const express = require('express');
require('./src/db/mongooseConn')

const app = express();

app.use(express.json())

/**
 *  Get routes
 */
const postRoutes = require('./src/routes/postRoutes')

/**
 * Implement routes
 */
app.use('/api/posts/',postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Listening on port ' + PORT + '...');
})