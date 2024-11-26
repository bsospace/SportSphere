// src/app/profile/page.tsx
"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p className="text-gray-500">Loading...</p>;
    }

    if (!session) {
        return (
        <p className="text-red-500">
            You are not signed in. Please sign in to view this page.
        </p>
        );
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
        <h1 className="text-xl font-bold">Profile</h1>
        {/* <p className="text-gray-700">Name: {session.user?.name}</p>
        <p className="text-gray-700">Email: {session.user?.email}</p>
        <p className="text-gray-700">Role: {session.role}</p> */}
        </div>
    );
}