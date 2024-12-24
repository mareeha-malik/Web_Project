"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[role, setRole] = useState("");
    const router = useRouter();

    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password,role }),
            });

            if (response.ok) {
                alert("Signup successful!");
                router.push("/"); // Redirect to login page
            } else {
                alert("User Already exists");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-transparent border border-gray-50 shadow-2xl rounded-lg p-8 max-w-md w-full space-y-6">
                <h2 className="text-3xl font-extrabold text-center text-white">Sign Up for MW Sports</h2>
                <form onSubmit={handleSignUp} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-300 font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-3 bg-transparent text-gray-300 border border-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
