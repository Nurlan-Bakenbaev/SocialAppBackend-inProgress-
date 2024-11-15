import Notification from "../models/Notification.js";
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "from", select: "username profileImg" });

    if (!notifications) {
      return res.status(200).json({ message: "No notifications found" });
    }

    await Notification.updateMany({ to: userId, read: false }, { read: true });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const result = await Notification.deleteMany({ to: userId });
    if (result.deletedCount === 0) {
      return res
        .status(204)
        .json({ error: "No notifications found to delete" });
    }
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
