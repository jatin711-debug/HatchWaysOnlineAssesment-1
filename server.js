const ping = require('./routes/ping');
const posts = require('./routes/posts');
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const {PORT} = process.env;
const app = express();
app.use(bodyParser.json({type:'application/json'}));

app.use('/api',ping);
app.use('/api',posts);

app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
});