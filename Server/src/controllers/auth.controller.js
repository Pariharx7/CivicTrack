import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js"

// POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {


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


// POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //  Validate input
  if (!username || !password || username.trim() === "" || password.trim() === "") {
    throw new ApiError(400, "Username and password are required");
  }

  // Find user by username
  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if password matches
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid username or password");
  }

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

const loggedUser = await User.findById(user._id).select('-refreshToken -password')


const options =
{
    httpOnly: true,
    secure: true
}


  return res.status(200)
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken, options)
.json( new ApiResponse(200, { data: loggedUser, accessToken, refreshToken

}, "User Logged in Sucessfully"))

});


// POST /api/auth/logout
// Logout Controller Starts Here

const logoutUser = asyncHandler(async (req,res) => {
   
    await User.findByIdAndUpdate(req.myUser._id, {
  $unset: { refreshToken: "" }
}, {new: true }) // this is not updating

const options ={ 
    httpOnly: true,  
    secure: true
}

return res.status(200).clearCookie("accessToken", options)
.clearCookie("refreshToken", options)
.json(new ApiResponse(200, {}, "User Logged Out"))
})


// POST /api/auth/refresh-token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh Token missing");
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true,
      secure: true
    };

    return res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new ApiResponse(200, { accessToken: newAccessToken, refreshToken: newRefreshToken }, "Token refreshed"));

  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
});


// GET /api/auth/me
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.myUser, "Current User Fetched"));
});


export {registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser}