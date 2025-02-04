"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Upload, X, Save, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ReactSortable } from "react-sortablejs";
import Spinner from "@/components/Spinner";
import Swal from "sweetalert2";
// import { uploadImagesToS3 } from "@/actions/uploadActions";
import ImageUpload from "@/components/ImageUpload";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
  outOfStock: existingOutOfStock,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [outOfStock, setOutOfStock] = useState(existingOutOfStock || false);
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((result) => setCategories(result.data));
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
      outOfStock,
    };

    try {
      if (_id) {
        await axios.put("/api/products", { ...data, _id });
      } else {
        await axios.post("/api/products", data);
      }

      Swal.fire({
        icon: "success",
        title: "Product Saved!",
        text: "Your product has been successfully saved.",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/admin/products");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue saving the product. Please try again.",
        confirmButtonText: "OK",
      });
    }
  }

  // /api/upload============================
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);

      const newLinks = []; // Temporary array to store new links
      try {
        for (const file of files) {
          const data = new FormData();
          data.append("file", file);

          const res = await axios.post("/api/upload", data);
          console.log(res.data.links);

          // Add links to the temporary array
          newLinks.push(...res.data.links);
        }

        // Update the state once with all new links
        setImages((oldImages) => [...oldImages, ...newLinks]);

        // Optionally, show a success message
        // Swal.fire({
        //   icon: "success",
        //   title: "Upload Successful",
        //   text: "Your images have been uploaded successfully.",
        //   confirmButtonText: "OK",
        // });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "There was an issue uploading your images. Please try again.",
          confirmButtonText: "OK",
        });
      } finally {
        setIsUploading(false);
      }
    }
  }

  // =========================================

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...(catInfo?.properties || []));
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...(parentCat?.properties || []));
      catInfo = parentCat;
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-2 p-4 md:p-6 lg:p-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-body hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-title-lg font-bold text-black">
            {_id ? "Edit Product" : "New Product"}
          </h1>
        </div>

        <form
          onSubmit={saveProduct}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <div className="space-y-6">
            {/* Product Images */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                Product Images
              </label>
              <div className="flex flex-wrap gap-4">
                <ReactSortable
                  list={images}
                  setList={setImages}
                  className="flex flex-wrap gap-4"
                >
                  {images?.map((link) => (
                    <motion.div
                      key={link}
                      className="relative group w-24 h-24 rounded-lg overflow-hidden shadow-card-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={link}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((img) => img !== link)
                          )
                        }
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                      {/* <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                    </motion.div>
                  ))}
                </ReactSortable>
                {isUploading && (
                  <div className="w-24 h-24 flex items-center justify-center border border-stroke rounded-lg">
                    <Spinner />
                  </div>
                )}
                {/* New Upload Component */}
                <ImageUpload
                  onUpload={uploadImages}
                  isUploading={isUploading}
                />

                {/* <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-stroke rounded-lg cursor-pointer hover:border-primaryAdmin transition-colors">
                  <Upload size={20} className="text-body" />
                  <span className="text-xs text-body mt-1">Upload</span>
                  <input
                    type="file"
                    onChange={uploadImages}
                    className="hidden"
                  />
                </label> */}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black">
                  Product Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2.5 rounded-lg border border-stroke focus:border-primaryAdmin focus:ring-2 focus:ring-primaryAdmin/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">
                  Price (GHS)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-lg border border-stroke focus:border-primaryAdmin focus:ring-2 focus:ring-primaryAdmin/20 transition-all"
                />
              </div>
            </div>

            {/* Category and Properties */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Category</label>
              <select
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-stroke focus:border-primaryAdmin focus:ring-2 focus:ring-primaryAdmin/20 transition-all"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {propertiesToFill.map((p) => (
              <div key={p.name} className="space-y-2">
                <label className="text-sm font-medium text-black">
                  {p.name[0].toUpperCase() + p.name.substring(1)}
                </label>
                <select
                  value={productProperties[p.name]}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-stroke focus:border-primaryAdmin focus:ring-2 focus:ring-primaryAdmin/20 transition-all"
                >
                  {p.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="space-y-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={outOfStock}
                  onChange={(ev) => setOutOfStock(ev.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primaryAdmin/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-danger"></div>
                <span className="ml-3 text-sm font-medium text-black">
                  Out of Stock
                </span>
              </label>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                Description
              </label>
              <textarea
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder="Enter product description"
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-stroke focus:border-primaryAdmin focus:ring-2 focus:ring-primaryAdmin/20 transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-primaryAdmin text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Save size={20} />
                <span>Save Product</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
