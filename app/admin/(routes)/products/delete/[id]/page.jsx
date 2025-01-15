

"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function DeleteProductPage({ swal }) {
  const [productInfo, setProductInfo] = useState();
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    axios
      .get("/api/products?id=" + id)
      .then((response) => setProductInfo(response.data))
      .catch((error) => {
        console.error("Error fetching product details:", error);
        swal.fire({
          title: "Error",
          text: "Failed to load product details. Please try again later.",
          icon: "error",
        });
      });
  }, [id]);

  async function deleteProduct() {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you really want to delete "${productInfo?.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No, Cancel",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete("/api/products?id=" + id);
            swal.fire({
              title: "Deleted!",
              text: "The product has been deleted.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            router.push("/admin/products");
          } catch (error) {
            console.error("Error deleting product:", error);
            swal.fire({
              title: "Error",
              text: "Failed to delete the product. Please try again later.",
              icon: "error",
            });
          }
        }
      });
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center py-10 space-y-6 bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-800">
          Deleting Product: <span className="text-danger font-bold">&quot;{productInfo?.title}&quot;</span>
        </h1>
        <div className="flex space-x-4">
        <button
          onClick={deleteProduct}
          className="px-6 py-2 font-semibold text-white bg-danger rounded-md shadow-lg hover:bg-red-600 transition-colors"
        >
          Confirm Delete
        </button>
        <button
             onClick={() => router.push("/admin/products")}
             className="px-6 py-2 font-semibold text-gray-800 bg-gray-200 rounded-md shadow-lg hover:bg-gray-300 transition-colors"
           >
             No, Cancel
           </button>
           </div>
      </div>
    </DefaultLayout>
  );
}

export default withSwal(({ swal }, ref) => <DeleteProductPage swal={swal} />);
