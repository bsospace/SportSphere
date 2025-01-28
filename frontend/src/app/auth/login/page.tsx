"use client";

import { ArrowRight } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo and Branding Section */}
          <div className="text-center mb-8">
            <div className="inline-block p-2 bg-blue-50 rounded-xl mb-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Sport Sphere
              </div>
              <div className="text-sm text-gray-500 mt-1">by BSOSpace</div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-500 mt-2">Please sign in to continue</p>
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <a
              href={`${process.env.NEXT_PUBLIC_APP_OPENID_API}/api/v1/auth/${'google'}?service=${'sportsphere'}&redirect=${process.env.NEXT_PUBLIC_APP_URL_CALL_BACK}`}
              className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span>Continue with Google</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            By continuing, you agree to our
            <a href="#" className="text-blue-500 hover:underline ml-1">Terms of Service</a>
            <span className="mx-1">and</span>
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}