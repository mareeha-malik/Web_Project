"use client";
import React, { useEffect, useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Link from 'next/link';
import {jwtDecode} from 'jwt-decode';

const HeaderMain = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      try {
       
        const decoded: any = jwtDecode(token);
        setUsername(decoded.username); 
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    setUsername(null); 
    window.location.href = '/'; 
  };

  return (
    <div className="flex border-b border-gray-400 py-2">
      <div className="container mx-auto flex flex-wrap justify-between items-center lg:space-x-6">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            src="Logo.svg"
            alt="Logo"
            width={50}
            height={50}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <div className="text-white font-bold text-xl sm:text-[25px] whitespace-nowrap">
            MW Sports
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-[300px] lg:w-[50%] relative mt-2 sm:mt-0 lg:mt-0">
          <input
            className="bg-transparent border border-gray-200 p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Search for Products here"
          />
          <BiSearchAlt2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-50" size={20} />
        </div>

        {/* Icons and Login/Username Button */}
        <div className="hidden lg:flex gap-4 items-center text-gray-50 text-[25px]">
          {/* Heart Icon with Notification Badge */}
          <div className="relative">
            {/* <FaRegHeart />
            <div className="bg-BrightOrange rounded-full absolute top-0 right-0 w-[15px] h-[15px] text-[10px] text-white grid place-items-center translate-x-1 -translate-y-1">
              Likes count */}
            {/* </div> */}
          </div>

          {/* Shopping Bag Icon with Badge */}
          <div className="relative">
           
          </div>

          {/* Display username and Logout button */}
          {username ? (
            <div className="flex items-center gap-2">
              <span>{username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/LoginPage">
              <button className="text-white border border-white rounded-lg py-1 px-4 hover:bg-white hover:text-black transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
