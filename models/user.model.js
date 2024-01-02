import {Schema, model} from 'mongoose';
import mongoose from 'mongoose'

const userSchema = new Schema ({
    username:{
        type:String ,
        required :true ,
        unique :true 
    },
     email:{
        type:String ,
        required :true,
        unique :true 
    },
    password:{
        type:String ,
        required :true ,
    },
    avatar:{
        type:String,
        default:"https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }

}, {timestamps:true})

const user = mongoose.model('user ', userSchema) ;


export default user 