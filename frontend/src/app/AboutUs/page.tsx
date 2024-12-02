// app/About/page.tsx
import React from 'react';
import Image from 'next/image';
import { FaHandsHelping } from 'react-icons/fa';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { FaLightbulb } from 'react-icons/fa6';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="bg-BgWalaBlack text-gray-300">
      {/* Hero Section */}
      <section className="relative h-60">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Image src="/Hero_All_Shirts.svg" alt="Hero" layout="fill" objectFit="cover" />
        <div className="relative flex items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-white">About MW Sports</h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="p-5 text-center">
        <h2 className="text-4xl font-bold mb-5">Our Story</h2>
        <p className="text-lg mb-4">
          MW Sports was founded with the mission of bringing the best sporting goods to athletes
          everywhere. Our passion for sports drives us to deliver top-quality products and 
          unparalleled customer service.
        </p>
        <p className="text-lg mb-4">
          With years of experience in the industry, we understand the needs of athletes and 
          aim to provide them with the tools they need to excel.
        </p>
      </section>
<section className="bg-BgWalaBlack p-10 min-h-screen flex flex-col justify-center items-center">
  <h2 className="text-4xl font-bold text-center mb-5">Meet Our Team</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center text-center">
    <div className="border rounded-lg p-5 shadow-lg">
      <Image src="/Cards.png" alt="Team Member" className="rounded-full mx-auto" width={100} height={100} />
      <h3 className="text-xl font-bold mt-4">Mareeha Malik</h3>
      <p className="text-gray-300">CEO & Founder</p>
    </div>
    <div className="border rounded-lg p-5 shadow-lg">
      <Image src="/Awais.png" alt="Team Member" className="rounded-full  mx-auto" width={100} height={100} />
      <h3 className="text-xl font-bold mt-4">Muhammad Awais</h3>
      <p className="text-gray-300">Manager</p>
    </div>
  </div>
</section>


      <section className="p-10 text-center">
  <h2 className="text-4xl font-bold mb-5">Our Core Values</h2>
  <div className="flex flex-col md:flex-row justify-center items-center">
    <div className="m-4 flex flex-col justify-center items-center">
      <FaHandsHelping className="text-BrightOrange text-5xl mb-3" />
      <h3 className="text-xl font-bold">Integrity</h3>
    </div>
    <div className="m-4 flex flex-col justify-center items-center">
      <IoShieldCheckmarkOutline className="text-BrightOrange text-5xl mb-3" />
      <h3 className="text-xl font-bold">Quality</h3>
    </div>
    <div className="m-4 flex flex-col justify-center items-center">
      <FaLightbulb className="text-BrightOrange text-5xl mb-3" />
      <h3 className="text-xl font-bold">Innovation</h3>
    </div>
  </div>
</section>

      <section className="bg-HeaderWalaBlack p-10 text-center">
        <h2 className="text-4xl font-bold mb-5">What Our Customers Say</h2>
        <blockquote className="italic text-lg">
          "MW Sports has the best equipment! I couldn't be happier with my purchases."
          <cite className="block mt-2">- Satisfied Customer</cite>
        </blockquote>
      </section>

      <section className="p-10 text-center">
        <h2 className="text-4xl font-bold mb-5">Get In Touch</h2>
        <p className="mb-5">We would love to hear from you! Connect with us on our social media or reach out directly.</p>
        <Link href={'mailto:mareehamalik95@gmail.com'}>
        <button className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-100 transition">Contact Us</button>
        </Link>
      </section>
      
   </div>
  );
};

export default AboutPage;
