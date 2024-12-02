import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
const HeaderTop = () => {
  return <div className=" border-b border-gray-300 bg-HeaderWalaBlack hidden sm:block">
    <div className="container py-2">
        <div className="flex justify-between items-center">
       
        <div className="hidden lg:flex gap-1 -ml-20">

<div className="header_top_icon_wrapper">
    <FaFacebook/>
</div>
<div className="header_top_icon_wrapper">
    <FaTwitter/>
</div>
<div className="header_top_icon_wrapper">
<Link href={'https://www.instagram.com/mareeha._.2925/profilecard/?igsh=MWk5MTZ6YmM3MnZhcg=='}><FaInstagram/></Link> 
</div>
<div className="header_top_icon_wrapper">
    <FaLinkedin/>
</div>
</div>
            <div className="text-gray-50 text-[12px]">
                <b>FREE SHIPPING</b> THIS ORDER OVER -55$
            </div>
            <div className="flex gap-4 -mr-20">
                <select 
                className="text-white bg-transparent  text-[12px] w-[70px]"
                name="Currency" id="Currency">
                    <option className="bg-HeaderWalaBlack" value="USD $">USD $</option>
                    <option className="bg-HeaderWalaBlack" value="EURO ">EURO &euro;</option>
                    <option className="bg-HeaderWalaBlack" value="USD $">PKR </option>
                </select>

                <select 
                className="text-white bg-transparent  text-[12px] w-[80px]"
                name="Language" id="Language">
                    <option className="bg-HeaderWalaBlack  cursor-pointer hover:bg-HeaderWalaBlack" value="English">English</option>
                    <option  className="bg-HeaderWalaBlack" value="Urdu">Urdu</option>
                </select>
            </div>
        </div>
    </div>
  </div>
}

export default HeaderTop;