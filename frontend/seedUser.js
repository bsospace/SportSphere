const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Replace with your MongoDB URI
const MONGODB_URI = "mongodb://217.15.162.48:7007/sportsphere-dev";

// Define the User schema
const userSchema = new mongoose.Schema({
    username: String,
    fullName: String,
    role: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

// Connect to MongoDB and insert the admin user
const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        const hashedPassword = await bcrypt.hash("smart123", 10);

        // Check if the admin already exists
        const existingAdmin = await User.findOne({ username: "smart" });
        if (existingAdmin) {
        console.log("Admin user already exists:", existingAdmin);
        return;
        }

        // Insert the admin user
        const admin = new User({
        username: "smart",
        fullName: "Test Smart",
        role: "staff",
        password: hashedPassword,
        });

        await admin.save();
        console.log("Admin user created successfully:", admin);
    } catch (error) {
        console.error("Error seeding admin user:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedAdmin();