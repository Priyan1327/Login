import mongoose from "mongoose";
import User from "../models/user.model.js";


// API for Creat user---( POST )
export const createuser = async(req , res ) => {
    const user = req.body; 

    //if field is empty ---
    if(!user.name || !user.mail || !user.password){
       return  res.status(400).json({success : false , message : "please provide all fields"}); // for feild empty.
    }

    const newUser = new User(user);
    
    try{
        await newUser.save();
        res.status(201).json({success : true , data : newUser}); // creating new user information
    }catch(error){
        console.error("Error in Creating USer :",error.message);
        res.status(500).json({success : false , message : "Server error"}); // user can't cerat it 
    }
};

// API for Getuser------( GET )
export const getuser = async (req ,res) => {
    try{
        const {id} = req.params;

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({sucess : false , message : "User Not Found"});
        }
        res.status(200).json({sucess:true , data : user});

    }catch(error){
        console.log("error in fetch in user" ,error)
        res.status(400).json({success : false , message : "User is Not Found. Please Check the Field "})
    }
};

// API for Deleat user----- ( DELEAT )
export const deleatuser = async(req,res) => {
    const{id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User ID" });
    }

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({sucess : true , message : "USer is deleated"}) // It deleat user as per the ID.
    }catch(error){
      res.status(500).json({sucess : false , message : "Server Error"}) // entred someother thing.
    }
};

// API for Update user-------( PUT )
export const updateuser = async (req, res) => {

    const { id } = req.params; // identifying the ID.

    const updates = req.body; // define the object to change it corosponding value.

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate( id, updates,{ new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
     }
};


// API for Login----------(POST)
export const loginuser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password });
    if (user) {
       return res.status(200).json({ success: true , message :` Welcome ${user.name || user._doc.name}`});
    } else {
      return res.status(401).json({ success: false , message : "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

