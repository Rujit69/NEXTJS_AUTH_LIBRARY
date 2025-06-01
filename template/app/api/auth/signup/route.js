// /app/api/auth/signup/route.js

import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // 1) Basic validation
    if (
      !username ||
      typeof username !== "string" ||
      username.length < 8 ||
      username.length > 20
    ) {
      return NextResponse.json(
        { error: "Username must be 8–20 characters long." },
        { status: 400 }
      );
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // 2) Connect to MongoDB
    await connectToDB();

    // 3) Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists." },
        { status: 400 }
      );
    }

    // 4) Create new user and let Mongoose's pre-save hook hash it
    const newUser = new User({
      username,
      password, // <-- do NOT hash here; let your model’s pre-save hook handle it
    });
    await newUser.save();

    // 5) Return success
    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
