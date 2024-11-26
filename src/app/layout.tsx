"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <SessionProvider>{children}</SessionProvider>
        <footer className="mt-auto bg-gray-800 text-white py-4">
          <div className="text-center text-sm">
            <p>
              Made with <span role="img" aria-label="love">❤️</span> by{" "}
                SMOIF2024 and BSO Space
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}