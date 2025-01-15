
"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const params = useParams();
  
  useEffect(() => {
    if (!params.id) return;
    
    axios.get('/api/products?id=' + params.id)
      .then(response => {
        setProductInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product details. Please try again later.');
      });
  }, [params.id]);

  return (
    <DefaultLayout>
      <h1>Edit product</h1>
      {productInfo ? (
        <ProductForm {...productInfo} />
      ) : (
        <p>Loading product details...</p>
      )}
    </DefaultLayout>
  );
}