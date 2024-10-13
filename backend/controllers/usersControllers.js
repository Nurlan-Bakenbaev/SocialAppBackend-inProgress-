import User from "../models/userModel.js";
export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const getUser = await User.findOne({ username: username }).select(
      "-password"
    );
    if (!getUser) {
      return res.status(404).json({ status: "false", error: "User not found" });
    }
    res.status(200).json({ status: "success", data: getUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getSuggestedUsers = async (req, res) => {
  console.log(req);

  try {
    const userId = req.user._id;

    const usersFollowedbyMe = await User.findById(userId);

    const users = await User.aggregate([
      {
        $match: { _id: { $ne: userId } },
      },
      { $sample: { size: 10 } },
      { $project: { password: 0 } },
    ]);
    const filteredUsers = await users.filter((user) =>
      usersFollowedbyMe.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    res.status(200).json({ status: "success", data: suggestedUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

////FOLLOW UNFOLLOW LOGIC
export const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findOne(req.body.user_id);

    // USER CANNOT FOLLOW OWN ACCOUNT
    if (id === currentUser._id.toString()) {
      return res
        .status(400)
        .json({ status: "false", error: "You cannot follow your own account" });
    }

    // CHECK IF USERS EXIST
    if (!userToModify || !currentUser) {
      return res.status(404).json({ status: "false", error: "User not found" });
    }

    // Check if currentUser is already following userToModify
    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // UNFOLLOW
      await User.findByIdAndUpdate(id, {
        $pull: { followers: currentUser._id },
      });
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { following: id },
      });
      return res.status(200).json({ status: "success", message: "Unfollowed" });
    } else {
      // FOLLOW
      await User.findByIdAndUpdate(id, {
        $push: { followers: currentUser._id },
      });
      await User.findByIdAndUpdate(currentUser._id, {
        $push: { following: id },
      });
      return res.status(200).json({ status: "success", message: "Followed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {};
