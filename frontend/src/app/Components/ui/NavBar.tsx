"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="hidden lg:block z-30 relative"> {/* Ensure NavBar is above other elements */}
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-2 text-white">
          <Link className="navbar__link relative" href="/">Home</Link>
          
          <div 
            className="relative" 
            onMouseEnter={() => setIsDropdownOpen(true)} 
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link className="navbar__link relative cursor-pointer" href="#">
              Shirts
            </Link>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-BgWalaBlack text-white rounded-lg shadow-lg z-50"> {/* Added z-50 */}
                <Link className="block px-4 py-2 hover:bg-BrightOrange" href="#">Jerseys</Link>
                <Link className="block px-4 py-2 hover:bg-BrightOrange" href="#">T-shirts</Link>
                <Link className="block px-4 py-2 hover:bg-BrightOrange" href="#">Full Sleeves</Link>

              </div>
            )}
          </div>

          <Link className="navbar__link relative" href="/Bats">Bats</Link>
          <Link className="navbar__link relative" href="Gears">Bags</Link>
          <Link className="navbar__link relative" href="#">Kits</Link>
          <Link className="navbar__link relative" href="/AboutUs">About Us</Link>

        </div>
      </div>
    </div>
  );
};

export default NavBar;
