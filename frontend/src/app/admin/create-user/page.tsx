"use client";

import { useState } from "react";

export default function CreateUserPage() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("user"); // Default role is "user"
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, fullName, role }),
        });

        if (response.ok) {
        setSuccessMessage("User created successfully!");
        setUsername("");
        setFullName("");
        setRole("user");
        } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to create user.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Create Staff/User</h1>

        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
        >
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                Username
            </label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter username"
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="fullName">
                Full Name
            </label>
            <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter full name"
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="role">
                Role
            </label>
            <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
                <option value="user">User</option>
                <option value="staff">Staff</option>
            </select>
            </div>

            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
            Create
            </button>

            {successMessage && (
            <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
            )}
            {errorMessage && (
            <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
            )}
        </form>
        </div>
    );
}