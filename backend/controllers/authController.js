//Creating controllers
import { generateTokenAndSetToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

//Create User
export const signup = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    // validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    // Check user exists
    const userNameExists = await User.findOne({ username });
    if (userNameExists) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // Create new user 

    const newUser = new User({
      username,
      fullname,
      email,
      password,
    });
    await newUser.save();
    // Save a new user to database
    if (newUser) {
      generateTokenAndSetToken(newUser._id, res);
      // Send response with user data
      return res.status(201).json({
        message: "User registered successfully",
        status: "success",
        data: {
          _id: newUser._id,
          fullname: newUser.fullname,
          username: newUser.username,
          email: newUser.email,
          followers: newUser.followers,
          following: newUser.following,
          profileImg: newUser.profileImg,
          coverImg: newUser.coverImg,
          bio: newUser.bio,
          link: newUser.link,
        },
      });
    } else {
      return res.status(400).json({ error: "Failed to register user" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
//////////////////////////////////////////////

//login user
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await User.findOne({ email: email }).select("+password");
    if (!loginUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, loginUser?.password);
    if (!passwordMatch || !loginUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    //this function is comes from lib.utils file
    generateTokenAndSetToken(loginUser._id, res);

    //send response
    res.status(200).json({
      status: "success",
      data: loginUser,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//find my account
export const getMyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
