import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Get user profile by username
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
    const { id } = req.params; // User ID to follow/unfollow
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

  try {
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ status: "false", error: "User not found" });
    }
    if (!newPassword || !currentPassword) {
      return res.status(400).json({
        status: "false",
        error: "Current password and new password are required",
      });
    }
    if (currentPassword && newPassword) {
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ status: "false", error: "Current password is incorrect" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({
          status: "false",
          error: "New password must be at least 6 characters long",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
    }
    if(profileImg){

    }
    if(coverImg){
      
    }
    const updatedUser = await User.findByIdAndUpdate(userId, hashedPassword, {
      new: true,
    }).select("-password");
    res.status(200).json({ status: "success", data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
