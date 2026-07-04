import user from "./models/user.js";
import bcrypt from "bcryptjs";
import conectDB from "./config/db.js";
const seedUsers = async () => {
  conectDB(); 
  try {
    const hashPassword = await bcrypt.hash("Ghtr765!@!@", 10);

    const adminData = {
      name: "Admin User",
      email: "admin@example.com",
      password: hashPassword, 
      role: "admin"
    };
    const newUser = new user(adminData);
    await newUser.save();

    console.log("Admin user seeded successfully! 🎉");

  } catch (error) {
    console.error("Error seeding user:", error);
  }
};

seedUsers();