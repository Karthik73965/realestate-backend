import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userrouter from './Router/user.route.js'
import userauth from './Router/auth.route.js'
import listingroute from './Router/listing.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use('/api/user' , userrouter)
app.use('/api/auth',userauth)
app.use('/api/listing',listingroute)

app.use((req, res,err)=>{
    const statuscode = err.statusCode || 500 ;
    const message = err.message;

    return  res.status(statuscode).json({
        sucess:false,
        statuscode,
        message:message ,
    })
})

mongoose.connect(process.env.MONGO_URL ).then(()=>{
    console.log('mongodb has been connected ')
}).catch((err)=>{
    console.error(err)
}).then(()=>{
    app.listen(3000 , ()=>{
        console.log("server is runing on port 3000")
    })
})

