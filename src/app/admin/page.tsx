"use client";

// import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
    // const { data: session, status } = useSession();
    // const router = useRouter();

    // Redirect if the user is not an admin
    // useEffect(() => {
    //     if (status === "authenticated" && session?.role !== "admin") {
    //     router.push("/");
    //     }
    // }, [session, status, router]);

    // Show loading state while checking session
    // if (status === "loading") {
    //     return (
    //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //         <p className="text-lg text-gray-500">Loading...</p>
    //     </div>
    //     );
    // }

    // Prevent rendering if user is being redirected
    // if (status === "authenticated" && session?.role !== "admin") {
    //     return null;
    // }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
        <header className="w-full bg-blue-600 py-6 text-white text-center">
            <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
            <p className="mt-2 text-lg">This is your admin dashboard.</p>
        </header>

        <main className="w-full max-w-4xl px-6 py-8 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <nav>
            <ul className="space-y-3">
                <li>
                <Link
                    href="/admin/create-user"
                    className="block w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Create Staff/User
                </Link>
                </li>
                {/* Add more navigation links here */}
            </ul>
            </nav>
        </main>

        <footer className="w-full mt-auto py-4 bg-gray-100 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} SportSphere. All rights reserved.</p>
        </footer>
        </div>
    );
}