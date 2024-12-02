"use client";
import React, { useEffect, useState } from "react";
import Product_Card from "./Product_Card";
import { axiosInstance } from "../../utils/api";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      // const response = await axiosInstance.get("/product/all");
      const response = await axios.get("http://localhost:8000/product/all");
      setProducts(response.data);
      console.log(response);
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="container pt-16">
        <h2 className="font-medium text-2xl pb-4">New Products</h2>
        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
          {products.map((product, index) => (
            <Product_Card
              key={index}
             img={product.img}
              title={product.title}
              desc={product.description}
              rating={product.rating}
              price={product.price}
              id={product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
