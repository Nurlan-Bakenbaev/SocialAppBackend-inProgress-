import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Notification from "../models/Notification.js";
import { v2 as cloudinary } from "cloudinary";
import { populate } from "dotenv";
// Create a new post
export const createPost = async (req, res) => {
  const { text } = req.body;
  let { img } = req.body;

  const userId = req.user._id.toString();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!text && !img) {
      return res.status(400).json({ error: "Provide Image or Text " });
    }
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url.toString();
    }
    const newPost = await Post.create({
      text,
      img,
      user: userId,
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { posts: newPost._id } },
      { new: true }
    );
    await newPost.save();
    res.status(201).json({ status: "success", data: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in Post Controller", error.message);
  }
};

// get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "user",
      })
      .populate("comments.user")
      .sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    res
      .status(200)
      .json({ feedType: "Get All Posts", status: "success", data: posts });
  } catch (error) {
    console.log("Error in Post Controller", error.message);
    res.status(500).json({ error: error.message });
  }
};
// following posts
export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const following = user.following;
    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({
        createdAt: -1,
      })
      .populate("user");
    if (feedPosts.length === 0) {
      return res.status(204).json({ message: "No posts found" });
    }
    res.status(200).json({
      feedType: "Following Posts",
      status: "success",
      data: feedPosts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get user liked Posts
export const getAllikedPosts = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const likedPosts = await Post.find({
      _id: { $in: user.likedPosts },
    })
      .populate("user")
      .populate("comments.user");
    if (likedPosts.length === 0) {
      return res.status(400).json({ message: "No liked posts found" });
    }
    res.status(200).json({ data: likedPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get user Posts
export const getUserPosts = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.find({ username: username });
    const posts = await Post.find({ user: user._id }).populate("user");
    if (posts.length === 0) {
      return res.status(200).json({ error: "No posts found" });
    }
    res.status(200).json({ status: "success", data: posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete post by Id
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ error: "Post not found" });
    }
    const post = await Post.findById(postId);
    const userId = req.user._id.toString();
    if (post.user.toString() !== userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to Delete" });
    }
    //DELETE IMAGE FROM CLOUDINARY
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ status: "success", message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Comments
export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    if (!text) {
      return res.status(400).json({ error: "Comment text is required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = { user: userId, text };
    post.comments.push(comment);
    await post.save();
    return res.status(200).json({ status: "success", comments: post.comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like unLike Post
export const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      // UNLIKE POST
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      //USER UNLIKED POST
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
      return res.status(200).json({ message: "Post unliked successfully" });
    } else {
      // LIKE POST
      post.likes.push(userId);
      //USER LIKED POST
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();
      // Create notification for the like
      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
        postId: postId,
      });
      await notification.save();

      return res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.log("error in liked controller ");
    return res.status(500).json({ error: error.message });
  }
};
