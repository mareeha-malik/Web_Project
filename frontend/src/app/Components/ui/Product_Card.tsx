"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Link from 'next/link';

interface PropsType {
    id: number;
    img: string;
    title: string;
    desc: string;
    rating: number;
    price: string;
}

const Product_Card: React.FC<PropsType> = ({ id, img, title, desc, rating, price }) => {
    const [isLiked, setIsLiked] = useState(false); 

    const toggleLike = () => {
        setIsLiked(prev => !prev); 
    };

    const rating_star = (rating: number) => {
        return (
            <div className="flex gap-1 text-[15px] text-BrightOrange">
                {Array.from({ length: 5 }, (_, index) => (
                    index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
                ))}
            </div>
        );
    };

    return (
        <Link href={`/product/${id}`} className="px-4 border border-gray-300 rounded-xl max-w-[300px] transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
            <div>
                <Image 
                    className="w-full h-auto" 
                    src={`/img`}
                    width={100}
                    height={200}
                    alt={title} 
                />
            </div>

            <div className="space-y-2 py-2">
                <h2 className="text-BrightOrange font-medium uppercase">{title}</h2>
                <p className="text-sm text-gray-500">{desc ? desc : "No description available."}</p>
            </div>
            <div>{rating_star(rating)}</div>
            <div className="flex gap-10 items-center">
                Rs {price}.00
                <del className="text-gray-400 font-normal">Rs {parseInt(price) + 50}</del>
                <div className="text-15px text-red-700 cursor-pointer" onClick={toggleLike}>
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                </div>
            </div>
        </Link>
    );
};

export default Product_Card;
