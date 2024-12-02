'use client';

import { useParams } from 'next/navigation';
import Product_data from '@/app/Product_data.json'; // Import product data
import { FaStar, FaRegStar } from 'react-icons/fa'; // For rating stars
// Import your product data

const ProductDetails = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL

  // Ensure 'id' is a string and convert it to a number
  if (typeof id !== 'string') {
    return <div>Invalid product ID</div>;
  }

  const productId = parseInt(id, 10);  // Parse the 'id' as an integer

  // Find the product with the corresponding id
  const product = Product_data.find((item) => item.id === productId);

  // If no product is found, return a "Product Not Found" message
  if (!product) {
    return <div>Product not found</div>;
  }

  const renderRating = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {Array(5)
          .fill(0)
          .map((_, index) =>
            index < rating ? <FaStar key={index} className="text-BrightOrange" /> : <FaRegStar key={index} className="text-BrightOrange" />
          )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-16 px-4 md:px-12">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="border border-white p-8 rounded-xl shadow-lg">
          <img
            src={product.img}
            alt={product.Title}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            {/* Product Title */}
            <h1 className="text-4xl font-bold text-white mb-2">{product.Title}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              {renderRating(product.rating)}
              <span className="text-gray-500">({product.rating} / 5)</span>
            </div>

            {/* Product Description */}
            <p className="text-gray-400 leading-relaxed mb-4">{product.desc}</p>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-BrightOrange">Rs {product.price}</span>
              <del className="text-gray-500 text-xl">Rs {parseInt(product.price) + 500}</del>
            </div>
          </div>

          {/* Call to Action */}
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

      {/* Extra Section - Product Highlights or Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">Why choose this product?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-BrightOrange">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Premium Quality</h3>
            <p className="text-gray-600">Crafted with the highest standards to ensure top-notch performance and durability.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-BrightOrange">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Innovative Design</h3>
            <p className="text-gray-600">A modern design that complements your style while keeping functionality in mind.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-BrightOrange">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Affordable Price</h3>
            <p className="text-gray-600">Get the best value for your money without compromising on quality.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
