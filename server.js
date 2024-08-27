const express = require('express');
const mongoose = require('mongoose');
const urlRouter = require('./routes/urlRout')
const path = require('path');
const env=require('dotenv')
env.config();

const mongoURI = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@${process.env.db_host}/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error',()=>{
    console.log('error');
})
db.once('open',()=>{
    console.log("connected");
})
const app = express();



// Correctly set the view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json())

app.use(express.urlencoded({extended: true}));

app.use('/',urlRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.listen(3000,()=>{
    console.log("running");
})
  