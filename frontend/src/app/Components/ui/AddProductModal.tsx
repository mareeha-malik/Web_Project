import { useState } from "react";
import Modal from "./Modal";

interface Product {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: number;
  image: string | null;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const AddProductModal = ({ isOpen, onClose, setProducts }: AddProductModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [imageURL, setImageURL] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB");
      } else {
        setError("");
        setImage(file);
        setImageURL(URL.createObjectURL(file)); // Convert File to URL for preview
      }
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !description || !rating || !price || !image) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8000/product/create", {  // Updated URL
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const newProduct: Product = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      onClose();

      // Reset form fields
      setTitle("");
      setDescription("");
      setRating("");
      setPrice("");
      setImage(null);
      setImageURL(null);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-500 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-96">
          <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}

            <label htmlFor="title" className="text-lg">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              className="border border-gray-300 p-2 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="description" className="text-lg">Description</label>
            <textarea
              id="description"
              placeholder="Enter description"
              className="border border-gray-300 p-2 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label htmlFor="rating" className="text-lg">Rating</label>
            <input
              type="number"
              id="rating"
              placeholder="Enter rating"
              className="border border-gray-300  text-black p-2 rounded-md"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            <label htmlFor="price" className="text-lg  text-black">Price</label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              className="border border-gray-300  text-black p-2 rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="image" className="text-lg">Image</label>
            <input
              type="file"
              id="image"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleFileChange}
            />
            
            {imageURL && (
              <div className="mt-4">
                <h3 className="text-lg">Image Preview:</h3>
                <img src={imageURL} alt="Preview" className="max-w-xs h-auto" />
              </div>
            )}

            <button type="submit" className="bg-black text-white p-2 rounded-md mt-4 hover:bg-gray-800">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;
