// src/components/AuthButtons.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
    const { data: session } = useSession();

    return (
        <div className="flex items-center space-x-4">
        {session ? (
            <>
            <p>Signed in as {session.user?.email}</p>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => signOut()}
            >
                Sign Out
            </button>
            </>
        ) : (
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => signIn()}
            >
            Sign In
            </button>
        )}
        </div>
    );
}