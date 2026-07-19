import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const run = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Read admin credentials from .env
    const email = (process.env.ADMIN_EMAIL || "admin@civicconnect.com").toLowerCase();
    const name = process.env.ADMIN_NAME || "Admin";
    const password = process.env.ADMIN_PASSWORD || "Admin@12345";

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if admin already exists
    const existing = await User.findOne({ email });

    if (existing) {
      // Update existing admin
      existing.name = name;
      existing.password = hashedPassword;
      existing.role = "admin";

      await existing.save();

      console.log("✅ Admin account updated successfully!");
      console.log(`Email: ${email}`);

      await mongoose.disconnect();
      return;
    }

    // Create new admin
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin account created successfully!");
    console.log(`Email: ${email}`);

    await mongoose.disconnect();

  } catch (err) {
    console.error("❌ Failed to seed admin:", err);
    process.exit(1);
  }
};

run();