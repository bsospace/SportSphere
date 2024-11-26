// // src/pages/api/users.ts
// import dbConnect from "@/lib/mongodb"; // Ensure this exists and connects to your database
// import User from "@/models/User"; // Your User model
// import bcrypt from "bcrypt";

// export default async function handler(req, res) {
//     await dbConnect(); // Connect to the database

//     if (req.method === "POST") {
//         const { username, fullName, password, role } = req.body;

//         try {
//         // Validate request body
//         if (!username || !fullName || !password || !role) {
//             return res.status(400).json({ success: false, message: "All fields are required." });
//         }

//         // Check if the username already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "Username already exists." });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const user = await User.create({
//             username,
//             fullName,
//             password: hashedPassword,
//             role,
//         });

//         res.status(201).json({ success: true, data: user });
//         } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//         }
//     } else {
//         res.setHeader("Allow", ["POST"]);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }