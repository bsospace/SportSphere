"use client";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-1/4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Sport Sphere</h1>
        <h1 className="text-2xl font-bold mb-4 text-center">by BSOSpace</h1>
        <div className="flex justify-center w-full">
          <a
            href={`${process.env.NEXT_PUBLIC_APP_OPENID_API}/api/v1/auth/${'google'}?service=${'sportsphere'}&redirect=${process.env.NEXT_PUBLIC_APP_URL_CALL_BACK}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-center"
          >
            Login with Google 
          </a>
        </div>
      </div>
    </div>
  );
}
