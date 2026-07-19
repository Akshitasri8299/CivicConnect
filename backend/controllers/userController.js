import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};