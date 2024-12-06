"use client";
import { useEffect, useState } from "react";
import AddProductModal from "@Components/ui/AddProductModal"; // Correct import path
import EditProductModal from "@Components/ui/UpdateBlogModal"; // Ensure EditProductModal is imported
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
} from "@Components/ui/card";

// Define types for the product object
interface Product {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: number;
  img: string | null;
}

const ProductsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string | null>(null);
  const [productIndex, setProductIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:8000/product/all");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  async function deleteProduct(index: number) {
    const productToDelete = products[index];
    const response = await fetch(
      `http://localhost:8000/product/delete/${productToDelete.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    setProducts((prev) => prev.filter((_, i) => i !== index));
  }

  function updateProduct(product: Product, index: number) {
    setProductId(product.id);
    setTitle(product.title);
    setDescription(product.description);
    setRating(product.rating);
    setPrice(product.price);
    setImage(product.img ?? "");
    setProductIndex(index);
    setIsEditModalOpen(true);
  }

  return (
    <div className="container mx-xs px-4 py-8">
      <h1 className="text-center text-3xl font-semibold mb-8">Products Page</h1>

      <button
        className="bg-BrightOrange text-white px-6 py-2 rounded-lg hover:bg-BrightOrange transition"
        onClick={() => setIsAddModalOpen((prev) => !prev)}
      >
        Add Product
      </button>

      {!products.length ? (
        <h2 className="text-center text-xl mt-10">No Products Available</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="shadow-lg hover:shadow-xl rounded-md overflow-hidden max-w-sm mx-auto"
            >
              <CardHeader className="bg-transparent p-4">
                {/* Optional: Add a title or any additional content in the header */}
              </CardHeader>
              <CardImage
                src={product.img ?? ""}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <CardContent className="p-4">
                <CardTitle className="text-lg text-BrightOrange font-semibold">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  {product.description}
                </CardDescription>
                <p className="text-White font-bold mt-2 text-sm">
                  Price: Rs {product.price}
                </p>
                <p className="text-yellow-500 mt-1 text-sm">
                  Rating: {product.rating} ⭐
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 bg-transparent">
                <button
                  className="border border-BrightOrange text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  onClick={() => updateProduct(product, index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-black px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => deleteProduct(index)}
                >
                  Delete
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        setProducts={setProducts}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        setProducts={setProducts}
        ProductId={productId}
        ProductTitle={title}
        ProductDesc={description}
        ProductRating={rating}
        ProductPrice={price}
        ProductImage={image}
        ProductIndex={productIndex}
      />
    </div>
  );
};

export default ProductsPage;
