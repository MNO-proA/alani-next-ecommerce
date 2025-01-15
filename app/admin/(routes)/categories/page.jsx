// "use client"

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { withSwal } from "react-sweetalert2";
// import { ReactSortable } from "react-sortablejs";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Spinner from "@/components/Spinner";

// function Categories({ swal }) {
//   const [editedCategory, setEditedCategory] = useState(null);
//   const [name, setName] = useState("");
//   const [parentCategory, setParentCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [images, setImages] = useState([]); // New state for images
//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   function fetchCategories() {
//     axios.get("/api/categories").then((result) => {
//       setCategories(result.data);
//     });
//   }

//   async function saveCategory(ev) {
//     ev.preventDefault();
//     const data = {
//       name,
//       parentCategory,
//       properties: properties.map((p) => ({
//         name: p.name,
//         values: p.values.split(","),
//       })),
//       images, // Add images to the category data
//     };
//     // if (editedCategory) {
//     //   data._id = editedCategory._id;
//     //   await axios.put("/api/categories", data);
//     //   setEditedCategory(null);
//     // } else {
//     //   await axios.post("/api/categories", data);
//     // }

//     try {
//       if (editedCategory) {
//         // Update category
//         data._id = editedCategory._id;
//         await axios.put("/api/categories", data);
//         setEditedCategory(null);
//       } else {
//         // Create new category
//         await axios.post("/api/categories", data);
//       }

//       // Clear the form after successful submission
//       setName("");
//       setParentCategory("");
//       setProperties([]);
//       setImages([]); // Clear images after saving
//       fetchCategories();
//     } catch (error) {
//       // Handle errors
//       console.error("Error saving category:", error);
//       alert("There was an error saving the category. Please try again.");

//       // Optionally, you could display the error in a user-friendly way (e.g., using a modal or toast notification)
//     }

//     // setName("");
//     // setParentCategory("");
//     // setProperties([]);

//   }

//   function editCategory(category) {
//     setEditedCategory(category);
//     setName(category.name);
//     setParentCategory(category.parent?._id);
//     setProperties(
//       category.properties.map(({ name, values }) => ({
//         name,
//         values: values.join(","),
//       }))
//     );
//     setImages(category.images || []); // Set images from the edited category
//   }

//   function deleteCategory(category) {
//     swal
//       .fire({
//         title: "Are you sure?",
//         text: `Do you want to delete ${category.name}?`,
//         showCancelButton: true,
//         cancelButtonText: "Cancel",
//         confirmButtonText: "Yes, Delete!",
//         confirmButtonColor: "#d55",
//         reverseButtons: true,
//       })
//       .then(async (result) => {
//         if (result.isConfirmed) {
//           const { _id } = category;
//           await axios.delete("/api/categories?_id=" + _id);
//           fetchCategories();
//         }
//       });
//   }

//   function addProperty() {
//     setProperties((prev) => {
//       return [...prev, { name: "", values: "" }];
//     });
//   }

//   function handlePropertyNameChange(index, property, newName) {
//     setProperties((prev) => {
//       const properties = [...prev];
//       properties[index].name = newName;
//       return properties;
//     });
//   }

//   function handlePropertyValuesChange(index, property, newValues) {
//     setProperties((prev) => {
//       const properties = [...prev];
//       properties[index].values = newValues;
//       return properties;
//     });
//   }

//   function removeProperty(indexToRemove) {
//     setProperties((prev) => {
//       return [...prev].filter((p, pIndex) => {
//         return pIndex !== indexToRemove;
//       });
//     });
//   }

//   async function uploadImages(ev) {
//     const files = ev.target?.files;
//     if (files?.length > 0) {
//       setIsUploading(true);
//       const data = new FormData();
//       for (const file of files) {
//         data.append("file", file);
//       }
//       try {
//         const res = await axios.post("/api/upload", data);
//         setImages((oldImages) => {
//           return [...oldImages, ...res.data.links];
//         });
//       } catch (error) {
//         console.error("Error uploading images:", error);
//         alert("There was an issue uploading the images. Please try again.");
//       }
//       setIsUploading(false);
//     }
//   }

//   function updateImagesOrder(images) {
//     setImages(images);
//   }

//   return (
//     <DefaultLayout>
//       <h1>Categories</h1>
//       <label>
//         {editedCategory ? `Edit category ${editedCategory.name}` : "Create new category"}
//       </label>
//       <form onSubmit={saveCategory}>
//         <div className="flex gap-1">
//           <input
//             type="text"
//             placeholder={"Category name"}
//             onChange={(ev) => setName(ev.target.value)}
//             value={name}
//           />
//           <select onChange={(ev) => setParentCategory(ev.target.value)} value={parentCategory}>
//             <option value="">No parent category</option>
//             {categories.length > 0 &&
//               categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name}
//                 </option>
//               ))}
//           </select>
//         </div>

//         <div className="mb-2">
//           <label className="block">Properties</label>
//           <button onClick={addProperty} type="button" className="btn-default text-sm mb-2">
//             Add new property
//           </button>
//           {properties.length > 0 &&
//             properties.map((property, index) => (
//               <div key={property.name} className="flex gap-1 mb-2">
//                 <input
//                   type="text"
//                   value={property.name}
//                   className="mb-0"
//                   onChange={(ev) => handlePropertyNameChange(index, property, ev.target.value)}
//                   placeholder="property name (example: color)"
//                 />
//                 <input
//                   type="text"
//                   className="mb-0"
//                   onChange={(ev) =>
//                     handlePropertyValuesChange(index, property, ev.target.value)
//                   }
//                   value={property.values}
//                   placeholder="values, comma separated"
//                 />
//                 <button
//                   onClick={() => removeProperty(index)}
//                   type="button"
//                   className="btn-red"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//         </div>

//         <div className="mb-2">
//           <label>Category Photos</label>
//           <div className="mb-2 flex flex-wrap gap-1">
//             <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
//               {!!images?.length &&
//                 images.map((link) => (
//                   <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
//                     <img src={link} alt="" className="rounded-lg" />
//                   </div>
//                 ))}
//             </ReactSortable>
//             {isUploading && (
//               <div className="h-24 flex items-center">
//                 <Spinner />
//               </div>
//             )}
//             <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
//               </svg>
//               <div>Add image</div>
//               <input type="file" onChange={uploadImages} className="hidden" />
//             </label>
//           </div>
//         </div>

//         <div className="flex gap-1">
//           {editedCategory && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditedCategory(null);
//                 setName("");
//                 setParentCategory("");
//                 setProperties([]);
//                 setImages([]); // Clear images on cancel
//               }}
//               className="btn-default"
//             >
//               Cancel
//             </button>
//           )}
//           <button type="submit" className="btn-primary py-1">
//             Save
//           </button>
//         </div>
//       </form>

//       {!editedCategory && (
//         <table className="basic mt-4">
//           <thead>
//             <tr>
//               <td>Category name</td>
//               <td>Parent category</td>
//               <td></td>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.length > 0 &&
//               categories.map((category) => (
//                 <tr key={category._id}>
//                   <td>{category.name}</td>
//                   <td>{category?.parent?.name}</td>
//                   <td>
//                     <button
//                       onClick={() => editCategory(category)}
//                       className="btn-default mr-1"
//                     >
//                       Edit
//                     </button>
//                     <button onClick={() => deleteCategory(category)} className="btn-red">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       )}
//     </DefaultLayout>
//   );
// }

// export default withSwal(({ swal }, ref) => <Categories swal={swal} />);

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import { ReactSortable } from "react-sortablejs";
import {
  PlusCircle,
  Pencil,
  Trash2,
  FolderTree,
  Upload,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Spinner from "@/components/Spinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  // async function saveCategory(ev) {
  //   ev.preventDefault();
  //   const data = {
  //     name,
  //     parentCategory,
  //     properties: properties.map((p) => ({
  //       name: p.name,
  //       values: p.values.split(","),
  //     })),
  //     images,
  //   };

  //   try {
  //     if (editedCategory) {
  //       data._id = editedCategory._id;
  //       await axios.put("/api/categories", data);
  //       setEditedCategory(null);
  //     } else {
  //       await axios.post("/api/categories", data);
  //     }

  //     setName("");
  //     setParentCategory("");
  //     setProperties([]);
  //     setImages([]);
  //     fetchCategories();
  //   } catch (error) {
  //     console.error("Error saving category:", error);
  //     swal.fire({
  //       title: "Error",
  //       text: "Failed to save category. Please try again.",
  //       icon: "error",
  //     });
  //   }
  // }
  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
      images,
    };
  
    try {
      if (editedCategory) {
        data._id = editedCategory._id;
        await axios.put("/api/categories?_id=" + data._id, data);
        setEditedCategory(null);
      } else {
        await axios.post("/api/categories", data);
      }
  
      setName("");
      setParentCategory("");
      setProperties([]);
      setImages([]);
      fetchCategories();
  
      swal.fire({
        title: "Success!",
        text: editedCategory
          ? "Category updated successfully."
          : "Category created successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error saving category:", error);
      swal.fire({
        title: "Error",
        text: "Failed to save category. Please try again.",
        icon: "error",
      });
    }
  }
  

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
    setImages(category.images || []);
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
        confirmButtonColor: "#dc2626",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete("/api/categories?_id=" + category._id);
            fetchCategories();
            swal.fire({
              title: "Deleted!",
              text: "Category has been deleted.",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
          } catch (error) {
            swal.fire({
              title: "Error",
              text: "Failed to delete category.",
              icon: "error",
            });
          }
        }
      });
  }

  return (
    <DefaultLayout>
      <div className="p-4 md:p-6 bg-gray-2 min-h-screen">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-title-lg font-bold text-black">Categories</h1>
            <p className="text-body mt-1">Manage your product categories</p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 grid-cols-1 lg:grid-cols-2"
        >
          {/* Category Form */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editedCategory
                ? `Edit category: ${editedCategory.name}`
                : "Create new category"}
            </h2>
            <form onSubmit={saveCategory} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="Category name"
                    onChange={(ev) => setName(ev.target.value)}
                    value={name}
                    className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 focus:border-primary focus:ring-0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Parent Category
                  </label>
                  <select
                    onChange={(ev) => setParentCategory(ev.target.value)}
                    value={parentCategory}
                    className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 focus:border-primary focus:ring-0"
                  >
                    <option value="">No parent category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Properties Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">
                    Properties
                  </label>
                  <button
                    onClick={() =>
                      setProperties((prev) => [
                        ...prev,
                        { name: "", values: "" },
                      ])
                    }
                    type="button"
                    className="inline-flex items-center gap-2 text-primaryAdmin hover:text-primary-dark"
                  >
                    <PlusCircle size={16} />
                    <span>Add Property</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {properties.map((property, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <input
                        type="text"
                        value={property.name}
                        onChange={(ev) => {
                          const newProperties = [...properties];
                          newProperties[index].name = ev.target.value;
                          setProperties(newProperties);
                        }}
                        placeholder="Property name"
                        className="flex-1 rounded-lg border border-stroke bg-transparent px-4 py-2 focus:border-primary focus:ring-0"
                      />
                      <input
                        type="text"
                        value={property.values}
                        onChange={(ev) => {
                          const newProperties = [...properties];
                          newProperties[index].values = ev.target.value;
                          setProperties(newProperties);
                        }}
                        placeholder="Values (comma separated)"
                        className="flex-1 rounded-lg border border-stroke bg-transparent px-4 py-2 focus:border-primary focus:ring-0"
                      />
                      <button
                        onClick={() =>
                          setProperties((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        type="button"
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images Section */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category Images
                </label>
                <div className="flex flex-wrap gap-2">
                  <ReactSortable
                    list={images}
                    setList={setImages}
                    className="flex flex-wrap gap-2"
                  >
                    {images.map((link) => (
                      <div key={link} className="relative group">
                        <img
                          src={link}
                          alt=""
                          className="w-24 h-24 object-cover rounded-lg border border-stroke"
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
                      </div>
                    ))}
                  </ReactSortable>
                  {isUploading && (
                    <div className="w-24 h-24 flex items-center justify-center border border-stroke rounded-lg">
                      <Spinner />
                    </div>
                  )}
                  <label className="w-24 h-24 flex flex-col items-center justify-center border border-dashed border-primaryAdmin rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload size={20} className="text-primaryAdmin" />
                    <span className="text-xs text-primaryAdmin mt-1">
                      Upload
                    </span>
                    {/* <input
                      type="file"
                      onChange={async (ev) => {
                        const files = ev.target?.files;
                        if (files?.length > 0) {
                          setIsUploading(true);
                          const data = new FormData();
                          for (const file of files) {
                            data.append('file', file);
                          }
                          try {
                            const res = await axios.post("/api/upload", data);
                            console.log(res)
                            console.log(res.data)
                            console.log(res.data.links)
                            
                            setImages(prev => [...prev, ...res.data.links]);
                          } catch (error) {
                            swal.fire({
                              title: 'Error',
                              text: 'Failed to upload images.',
                              icon: 'error',
                            });
                          }
                          setIsUploading(false);
                        }
                      }}
                      className="hidden"
                      accept="image/*"
                    /> */}
                    <input
                      type="file"
                      onChange={async (ev) => {
                        const files = ev.target?.files;
                        if (files?.length > 0) {
                          setIsUploading(true);
                          const data = new FormData();
                          for (const file of files) {
                            data.append("file", file);
                          }

                          try {
                            const res = await axios.post("/api/upload", data);
                            console.log(res);

                            // Validate response structure
                            if (
                              res.data &&
                              res.data.links &&
                              Array.isArray(res.data.links)
                            ) {
                              console.log(res.data.links);
                              setImages((prev) => [...prev, ...res.data.links]);
                            } else {
                              throw new Error("Unexpected Network Error");
                            }
                          } catch (error) {
                            console.error("Error uploading images:", error);
                            swal.fire({
                              title: "Error",
                              text: `Failed to upload images. ${error}`,
                              icon: "error",
                            });
                          } finally {
                            setIsUploading(false);
                          }
                        }
                      }}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {editedCategory && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditedCategory(null);
                      setName("");
                      setParentCategory("");
                      setProperties([]);
                      setImages([]);
                    }}
                    className="px-4 py-2 rounded-lg border border-stroke text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primaryAdmin text-white hover:bg-opacity-90"
                >
                  {editedCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>

          {/* Categories List */}
          {!editedCategory && (
            <motion.div
              variants={containerVariants}
              className="bg-white rounded-xl shadow-card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-2 border-b border-stroke">
                      <th className="py-5 px-6 text-left font-medium text-black">
                        Category
                      </th>
                      <th className="py-5 px-6 text-left font-medium text-black">
                        Parent
                      </th>
                      <th className="py-5 px-6 text-left font-medium text-black">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <motion.tr
                        key={category._id}
                        variants={itemVariants}
                        className="border-b border-stroke hover:bg-gray-2 transition-colors duration-200"
                      >
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gray-3 rounded-lg flex items-center justify-center">
                              <FolderTree className="text-primaryAdmin" />
                            </div>
                            <span className="font-medium text-black">
                              {category.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-gray-600">
                          {category?.parent?.name || "-"}
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => editCategory(category)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                            >
                              <Pencil size={16} />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => deleteCategory(category)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                            >
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </DefaultLayout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
