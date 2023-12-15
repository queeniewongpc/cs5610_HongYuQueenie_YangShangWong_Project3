const express = require('express');
const blogpostApi = require('./server/blogpost.server');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path')
const cookieParser = require('cookie-parser')

/* User Server Stuff */
const userApi = require('./server/user.server');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/blogpost', blogpostApi);
app.use('/api/user', userApi);

/* MongoDB Stuff */
const MONGO_CONNECTION_STRING = 'mongodb+srv://hyq:pineapple1234@nuwebdev.nqnv9f0.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));



// let frontend_dir = path.join(__dirname, '..', 'frontend', 'dist')

// app.use(express.static(frontend_dir));
// app.get('*', function (req, res) {
//     console.log("received request");
//     res.sendFile(path.join(frontend_dir, "index.html"));
// });

app.listen(process.env.PORT || 3500, function() {
    console.log("Starting server now...")
})