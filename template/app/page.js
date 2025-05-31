//page.js

"use client";

import { useState } from "react";
import {signIn} from "next-auth/react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleMode = () => {
    setError("");
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false, // prevent automatic redirect
      username,
      password,
      action: isSignUp ? "signup" : "login",
    });

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect after successful login/signup
      window.location.href = "/Home";
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={toggleMode} style={{ cursor: "pointer" }}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username" style={{ display: "block", marginBottom: 4 }}>
          Username
        </label>
        <input
          id="username"
          type="text"
          required
          minLength={8}
          maxLength={20}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="8-20 chars, letters/numbers/._"
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
        />

        <label htmlFor="password" style={{ display: "block", marginBottom: 4 }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          style={{ width: "100%", padding: 8, marginBottom: 16 }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {isSignUp ? "Create Account" : "Sign In"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: 12, textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
}
