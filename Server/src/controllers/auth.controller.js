import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js"

// POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {


  const { username, email, phonenumber, password } = req.body;


  // all fields are required 

 if([username, email, phonenumber, password].some((fields) => fields?.trim() === ""
        ))
        {
            throw new ApiError(400, "All fields are required")
        }


   // Check for existing user

       const existingUser = await User.findOne({$or: [{username, email, phonenumber}]});

       if(existingUser){
        throw new ApiError(409, "User Already Exists")
       }



  // Create new user
  const newUser = await User.create({
    username,
    email,
    phonenumber,
    password,
  });



  const createdUser = await User.findById(newUser._id).select(" -password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Error while Registering")
    }

    return res.status(201).json( new ApiResponse(200, createdUser, "User registered successfullyy"))

});



export default {registerUser}