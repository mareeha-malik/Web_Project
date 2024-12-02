"use client";
import { useEffect, useState } from "react";
import AddProductModal from "@Components/ui/AddProductModal"; // Correct import path
import EditProductModal from "@Components/ui/UpdateBlogModal"; // Ensure EditProductModal is imported
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@Components/ui/card";

// Define types for the product object
interface Product {
  id: number; 
  title: string;
  description: string;
  rating: number;
  price: number;
  image: string | null;  
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
  const [image, setImage] = useState<File | null>(null); 
  const [productIndex, setProductIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:8000/product");
      const data: Product[] = await response.json(); 
      console.log(data);
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
    setImage(product.image ? new File([new Blob()], product.image) : null); 
    setProductIndex(index);
    setIsEditModalOpen(true);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-semibold mb-8">Products Page</h1>

      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={() => setIsAddModalOpen((prev) => !prev)}
      >
        Add Product
      </button>

      {!products.length ? (
        <h2 className="text-center text-xl mt-10">No Products Available</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {products.map((product, index) => (
            <Card key={product.id} className="shadow-lg hover:shadow-xl rounded-md overflow-hidden">
              <CardHeader className="bg-gray-100 p-4">
                <CardTitle className="text-lg text-black font-semibold">{product.title}</CardTitle>
                <CardDescription className="text-gray-500">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                {product.image && (
                  <img
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                <p className="text-green-600 font-bold mt-2">Price: ${product.price}</p>
                <p className="text-yellow-500 mt-1">Rating: {product.rating} ⭐</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
                <button
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  onClick={() => updateProduct(product, index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500  text-black px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
