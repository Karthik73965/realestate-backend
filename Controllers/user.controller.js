import Listing from "../models/listing.model.js"
import user from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcrypt'

 
export const userTestController = async  (req,res)=>{
    res.json({
        messgae:"hello world"
    })
}
export const updateUser = async (req,res,next)=>{
    if(req.user.id != req.params.id) return next(errorHandler(401 , 'you can only change you credentials '))
    console.log(req.user.id)
    console.log(req.body.id);
    try {
        if(req.body.password) return req.body.password = bcryptjs.hashSync(req.body.password , 10)
        const updateUser = await user.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
              },
            },
            { new: true }
          );
        const {password ,...rest } = updateUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async(req,res,next)=>{
  if(req.user.id != req.params.id) return  next(errorHandler(403, "unauthorizec"))
  try {
     await user.findByIdAndDelete(req.params.id)
     res.clearCookie('access_token')
    res.status(200).json({message:"user has beem deleted succesfully"})
  } catch (error) {
    next(error)
  }
}

export const getUserListings = async (req, res, next) => {

  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
}; 

export const getuser = async (req, res, next) => {
  try {
    
    const User = await user.findById(req.params.id);
  
    if (!User) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = User._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};