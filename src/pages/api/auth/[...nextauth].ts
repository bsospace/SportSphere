// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Mock Admin Login",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("Received credentials:", credentials);

//         const mockAdmin = {
//           username: "admin",
//           password: "admin123",
//           role: "admin",
//         };

//         if (
//           credentials &&
//           credentials.username === mockAdmin.username &&
//           credentials.password === mockAdmin.password
//         ) {
//           console.log("Login successful");
//           return {
//             id: "1",
//             username: mockAdmin.username,
//             role: mockAdmin.role,
//           };
//         }

//         console.error("Invalid credentials");
//         return null;
//       },
//     }),
//   ],
//   secret: process.env.APP_SECRET || "supersecretkey",
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async session({ session, token }) {
//       session.user = {
//         id: token.id,
//         username: token.username,
//         role: token.role,
//       };
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.role = user.role;
//       }
//       return token;
//     },
//   },
// });