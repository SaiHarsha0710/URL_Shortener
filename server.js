const express = require('express');
const mongoose = require('mongoose');
const urlRouter = require('./routes/urlRout')
const path = require('path');

mongoose.connect('mongodb+srv://maddinenivenkatasaiharsha:HGR8w0ij1SRxJ5gH@cluster0.ggf8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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

module.exports = (req, res) => {
    app(req, res);
  };
  
  app.use((req, res, next) => {
    // Extract the client's IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()} - IP: ${ipAddress}`);
    next(); 
  });