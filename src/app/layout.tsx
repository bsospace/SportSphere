"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <SessionProvider>{children}</SessionProvider>
        <footer className="mt-auto bg-gray-800 text-white py-4">
          <div className="text-center text-sm">
            <p>
              Made with <span role="img" aria-label="love">❤️</span>&nbsp; by&nbsp;
                <a href="https://www.instagram.com/smoif.buu" target="blank" className="hover:text-blue-700 hover:underline">SMOIF2024</a> and <a href="https://www.bsospace.com" target="blank" className="hover:text-blue-700 hover:underline">BSO Space</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}