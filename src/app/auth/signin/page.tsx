// src/app/auth/signin/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
        });

        if (!result?.ok) {
        setError("Invalid username or password");
        } else {
        // Redirect on success
        window.location.href = "/admin";
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Admin Sign In</h1>

        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
        >
            {error && (
            <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
            )}

            <div className="mb-4">
            <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-2"
            >
                Username
            </label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
            />
            </div>

            <div className="mb-4">
            <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
            >
                Password
            </label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
            />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
            Sign In
            </button>
        </form>
        </div>
    );
}