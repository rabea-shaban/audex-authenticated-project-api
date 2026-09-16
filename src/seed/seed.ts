import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import connectDB from "../config/db";
import User from "../modules/auth/auth.model";
import Project from "../modules/project/project.model";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Project.deleteMany({});

    const password = await bcrypt.hash("Password@123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password,
      role: "ADMIN",
    });

    const manager = await User.create({
      name: "Manager",
      email: "manager@test.com",
      password,
      role: "MANAGER",
    });

    const user = await User.create({
      name: "User",
      email: "user@test.com",
      password,
      role: "USER",
    });

    await Project.create([
      {
        name: "Admin Project",
        description: "Admin project",
        owner: admin._id,
      },
      {
        name: "Manager Project",
        description: "Manager project",
        owner: manager._id,
      },
      {
        name: "User Project",
        description: "User project",
        owner: user._id,
      },
    ]);

    console.log("Seed completed successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();
