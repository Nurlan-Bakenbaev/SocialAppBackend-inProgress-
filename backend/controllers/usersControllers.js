import { v2 as cloudinary } from "cloudinary";

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Get user by username
export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const getUser = await User.findOne({ username }).select("-password");

    if (!getUser) {
      return res.status(404).json({ status: "false", error: "User not found" });
    }
    res.status(200).json({ status: "success", data: getUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get suggested users
export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const usersFollowedbyMe = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: { _id: { $ne: userId } },
      },
      { $sample: { size: 10 } },
      { $project: { password: 0 } },
    ]);

    const suggestedUsers = users
      .filter((user) => !usersFollowedbyMe.following.includes(user._id))
      .slice(0, 4);

    res.status(200).json({ status: "success", data: suggestedUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user._id;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    // USER CANNOT FOLLOW OWN ACCOUNT
    if (id === currentUserId.toString()) {
      return res
        .status(400)
        .json({ status: "false", error: "You cannot follow your own account" });
    }

    // CHECK IF USERS EXIST
    if (!userToModify || !currentUser) {
      return res.status(404).json({ status: "false", error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // UNFOLLOW
      await User.findByIdAndUpdate(id, {
        $pull: { followers: currentUserId },
      });
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { following: id },
      });
      return res.status(200).json({ status: "success", message: "Unfollowed" });
    } else {
      // FOLLOW
      await User.findByIdAndUpdate(id, {
        $push: { followers: currentUserId },
      });
      await User.findByIdAndUpdate(currentUserId, {
        $push: { following: id },
      });
      return res.status(200).json({ status: "success", message: "Followed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update user information
export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { fullname, username, email, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImg, coverImg } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ status: "false", error: "User not found" });
    }
    // Validate passwords
    if (currentPassword && newPassword) {
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      // check if password matches
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ status: "false", error: "Current password is incorrect" });
      }
      //validate new password
      if (newPassword.length < 6) {
        return res.status(400).json({
          status: "false",
          error: "New password must be at least 6 characters long",
        });
      }
      // Hash New Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Change Profile Image
    if (profileImg) {
      // FIRST DELETE the old one from DB
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadResponse.secure_url;
    }
    // Change Profile Image

    if (coverImg) {
      // FIRST DELETE the old one from DB

      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }

      const uploadResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadResponse.secure_url;
    }

    // Update  INFO
    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;
    user.bio = bio || user.bio;
    user.link = link || user.link;

    // Save to DB NEW USER INFO
    await user.save();

    const updatedUser = await User.findById(userId).select("-password");
    res.status(200).json({ status: "success", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};
