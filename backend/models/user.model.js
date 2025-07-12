import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     
    name:{
        type : String,
        required : true,
        unique : true
    },    
    mail:{
       
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
        
    }
},{
    timestamps : true // CreatAT ,updateAT
});

const User = mongoose.model('User',userSchema)

export default User;