
import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId })
      .sort({
        createdAt: -1,
      })
      .populate({ path: "from", select: " username profileImg" });
    await notifications.updateMany({ to: userId }, { read: true });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.deleteMany({ userId });
    if (!notifications) {
      return res
        .status(404)
        .json({ error: "No notifications found to delete" });
    }
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
