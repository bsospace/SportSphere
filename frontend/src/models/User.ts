// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";

// Define the User interface
interface IUser extends Document {
    username: string;
    fullName: string;
    role: "admin" | "staff" | "user";
    password: string;
    expiresAt?: Date; // Optional expiration field for temporary users
}

// Define the User schema
const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff", "user"], required: true },
    password: { type: String, required: true },
    expiresAt: { type: Date, expires: 0 }, // TTL index for temporary users
});

// Export the model
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);