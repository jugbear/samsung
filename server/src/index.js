//import models
require('./Models/User');
//import library
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
//import routers
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use(authRoutes);


const mongobdUri = 'mongodb+srv://sadegh:sadegh@cluster0.8goxd.mongodb.net/samsung?retryWrites=true&w=majority'
mongoose.connect(mongobdUri,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>[
    console.log('connect succsefuly')
])
mongoose.connection.on('error',(err)=>[
    console.log('connect failed',err)
])
app.get('/',(req,res)=>{
    res.send('welcome to sadegh website');
}) 

app.listen(4000, ()=> {
    console.log('listen to port 4000');
});
