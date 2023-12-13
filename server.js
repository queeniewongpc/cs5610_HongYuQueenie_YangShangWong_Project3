const express = require('express');
//const userApi = require('./server/user.server');
const postApi = require('./server/post.server');
const cors = require('cors')
//const mongoose = require('mongoose');
//const path = require('path')
//const cookieParser = require('cookie-parser')



const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());



//app.use('/api/user', userApi);
app.use('/api/post', postApi);

app.listen(process.env.PORT || 3500, function() {
    console.log("Starting server now...")
})