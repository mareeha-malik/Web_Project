"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from 'next/navigation'
import Link from 'next/link'; // Import Link from Next.js

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Initialize router from 'next/navigation'
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform authentication here

        alert(`Logged in with ${email}`);

        // Redirect to home page after login
        router.push('/');
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

                <div className="flex items-center justify-between text-sm text-gray-400">
                    <a href="#" className="hover:underline">Forgot Password?</a>
                    <Link href="./SignUp" className="hover:underline">Create an Account</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
