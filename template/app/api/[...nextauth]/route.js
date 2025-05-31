//routes.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your_username",
        },
        password: { label: "Password", type: "password" },
        action: {
          label: "Action",
          type: "text",
          placeholder: "login or signup",
        }, // extra field to distinguish action
      },
      async authorize(credentials) {
        await connectToDB();

        const { username, password, action } = credentials;

        if (action === "signup") {
          // SIGN UP flow
          const existingUser = await User.findOne({ username });
          if (existingUser) {
            throw new Error("Username already exists");
          }

          // Create new user (password hashing handled by pre-save hook)
          const newUser = new User({ username, password });
          await newUser.save();

          return {
            id: newUser._id.toString(),
            username: newUser.username,
            image: newUser.image || null,
          };
        } else if (action === "login") {
          // LOGIN flow
          const user = await User.findOne({ username });
          if (!user) {
            throw new Error("No user found with that username");
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            username: user.username,
            image: user.image || null,
          };
        } else {
          throw new Error("Invalid action");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.username = token.username;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // your custom login/signup page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
