require('dotenv').config({path:'src/.env'})

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet')
const app = express();
const userRoutes = require('./routes/userRoutes');



const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy :"cross-origin"}))
app.use("/api/users",userRoutes)

mongoose.connect(MONGODB_URI).then(()=>console.log("Connected to MongoDB")).catch((err)=>console.log(err));

app.get('/',(req,res)=>{
    console.log("Backend Server is running")
})


app.listen(PORT,()=>{
    console.log("Server running on Port 5000")
})
 