"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer `
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful, token:", data.token); // Log the successful response
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("username", data.username);  // Store username
        localStorage.setItem("role", data.role);  // Store user role
  
        alert("Login successful!");
        router.push("/");  // Redirect to homepage after login
      } else {
        const errorData = await response.json();
        console.error("Login error response:", errorData); // Log the error details
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(`An error occurred while logging in: ${(error as { message: string }).message}`);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-transparent border border-gray-50 shadow-2xl rounded-lg p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-white">Login to MW Sports</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-300 font-medium">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-transparent text-gray-300 border border-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 bg-transparent text-gray-300 border border-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
