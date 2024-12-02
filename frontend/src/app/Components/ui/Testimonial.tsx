import React from 'react';
import Image from 'next/image';

const Testimonial = () => {
  return (
    <div className="container pt-16 pb-16">
      <h2 className="font-medium text-2xl pb-4 text-center">Testimonials</h2>
      <div className="flex flex-col lg:flex-row justify-between items-stretch space-x-4">
        {/* Testimonial Section */}
        <div className="border border-gray-300 rounded-lg p-6 shadow-md w-full lg:w-[30%] mb-8 lg:mb-0 flex flex-col">
          <div className="flex flex-col items-center flex-grow">
            {/* Profile Picture */}
            <Image
              className="rounded-full"
              src="/ME.jpg"
              width={80}
              height={80}
              alt="Profile Picture"
            />

            {/* Name */}
            <h2 className="text-gray-50 font-black text-[20px] mt-2">Mareeha Malik</h2>

            {/* CEO Title */}
            <p className="text-gray-400 mb-2">CEO & Founder, Invision</p>

            {/* Quote Section */}
            <div className="py-2 flex flex-col items-center">
              <Image
                className="inline-block"
                src="Quote.svg"
                width={30}
                height={30}
                alt="Quote"
              />
              <p className="mt-2 max-w-[400px] text-gray-300 text-center">
                As the CEO of MW Sports, I take pride in our commitment to quality and innovation. Our products are designed for both performance and style, ensuring that athletes can excel while looking their best. I'm grateful for our passionate team and loyal customers who support our mission to enhance the sporting experience.
              </p>
            </div>
          </div>
        </div>

        {/* Promotional Section */}
        <div className="bg-red-600 bg-[url(/Footer.svg)] bg-cover rounded-2xl w-full lg:w-[70%] grid place-items-center" style={{ minHeight: '300px' }}>
          <div className="bg-[#ffffffab] min-w-[270px] sm:min-w-[300px] md:min-w-[500px] rounded-xl py-8 sm:px-8 px-2 grid place-items-center gap-3 flex-grow">
            <button className="bg-BrightOrange text-white p-2 rounded-md">25% DISCOUNT</button>
            <h2 className="font-extrabold text-2xl text-[#272727]">New Collection</h2>
            <p className="text-gray-500 text-[20px]">Starting at Rs 2000 <b>Shop Now</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
