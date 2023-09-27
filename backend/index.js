const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());//For CORS error
app.use('/api', userRoutes);


//Connecting to database
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Connected to database"))

//Starting the server
app.listen(3001 || process.env.PORT, ()=> console.log("Server Started"));