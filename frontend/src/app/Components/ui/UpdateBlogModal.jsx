"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const EditProductModal = ({
  isOpen,
  onClose,
  setProducts,
  ProductId,
  ProductTitle,
  ProductDesc,
  ProductIndex,
  ProductRating,
  ProductPrice,
  ProductImage,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(ProductTitle);
    setDescription(ProductDesc);
    setRating(ProductRating);
    setPrice(ProductPrice);
    setImage(null); // Reset the image field
  }, [ProductTitle, ProductDesc, ProductRating, ProductPrice]);

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("price", price);
    if (image) {
      formData.append("image", image); // Append the selected file
    }

    const response = await fetch(
      `http://localhost:8000/product/update/${ProductId}`,
      {
        method: "POST",
        body: formData, // Use FormData for file upload
      }
    );

    if (!response.ok) {
      setError("Failed to update product");
      return;
    }

    const updatedProduct = await response.json();

    setProducts((prev) =>
      prev.map((product, index) =>
        index === ProductIndex ? updatedProduct : product
      )
    );

    onClose();
    setTitle("");
    setDescription("");
    setPrice("");
    setRating("");
    setImage(null);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1>Update Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={onSubmit} className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          id="title"
          className="border-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="border-black"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          placeholder="Enter rating"
          className="border border-black p-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          placeholder="Enter price"
          className="border border-black p-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          className="border border-black p-2"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" className="bg-black text-white mt-4">
          Update Product
        </button>
      </form>
    </Modal>
  );
};

export default EditProductModal;
