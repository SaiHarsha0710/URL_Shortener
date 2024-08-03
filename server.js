const express = require('express');
const mongoose = require('mongoose');
const urlRouter = require('./routes/urlRout')
mongoose.connect('mongodb://127.0.0.1:27017/urlshorts')

const db = mongoose.connection;

db.on('error',()=>{
    console.log('error');
})
db.once('open',()=>{
    console.log("connected");
})
const app = express();

const port = process.env.PORT || 3002;

// Correctly set the view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/',urlRouter)

app.listen(port, () => {
    console.log("Server is running on port", port);
});
