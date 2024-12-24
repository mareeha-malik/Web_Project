"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  img: string;
  description: string;
  price: number;
  rating: number;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id !== "string") {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/product/${id}`);
        console.log("Full API Response:", response.data);

        setProduct(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const renderRating = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {Array(5)
          .fill(0)
          .map((_, index) =>
            index < rating ? (
              <FaStar key={index} className="text-BrightOrange" />
            ) : (
              <FaRegStar key={index} className="text-BrightOrange" />
            )
          )}
      </div>
    );
  };

  useEffect(() => {
    if (product) {
      console.log("Product Image URL:", `http://localhost:8000/${product.img}`); // Log only img field
    }
  }, [product]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto py-16 px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="border border-white p-8 rounded-xl shadow-lg">
        <div className=" p-8 rounded-xl shadow-lg">
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {product.title}
            </h1>

            <div className="flex items-center space-x-2 mb-4">
              {renderRating(product.rating)}
              <span className="text-gray-500">({product.rating} / 5)</span>
            </div>

            <p className="text-gray-400 leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-BrightOrange">
                Rs {product.price}
              </span>
              <del className="text-gray-500 text-xl">
                Rs {product.price + 500}
              </del>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="bg-BrightOrange text-white py-3 px-8 rounded-full shadow-md hover:bg-orange-600 transition duration-300">
              Add to Cart
            </button>
            <button className="bg-gray-800 text-white py-3 px-8 rounded-full shadow-md hover:bg-gray-900 transition duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">
          Why choose this product?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-BrightOrange">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-600">
              Crafted with the highest standards to ensure top-notch performance
              and durability.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-BrightOrange">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Innovative Design
            </h3>
            <p className="text-gray-600">
              A modern design that complements your style while keeping
              functionality in mind.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-BrightOrange">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Affordable Price
            </h3>
            <p className="text-gray-600">
              Get the best value for your money without compromising on quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
