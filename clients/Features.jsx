"use client";

import React, { useEffect, useState } from "react";
import { Edit2, Trash2, MoveUp, MoveDown, Power } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ImageUpload from "@/components/ImageUpload";
import Swal from "sweetalert2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const tabVariants = {
  inactive: { borderBottom: "2px solid transparent" },
  active: {
    borderBottom: "2px solid #3b82f6",
    transition: { duration: 0.2 },
  },
};

const FeatureAdmin = () => {
  const [heroFeatures, setHeroFeatures] = useState([]);
  const [videoFeatures, setVideoFeatures] = useState([]);
  const [activeTab, setActiveTab] = useState("hero");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mediaUrls: [],
    buttonText: "",
    buttonLink: "",
    isActive: true,
    order: 0,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const isVideoMode = activeTab === "video";

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const [heroRes, videoRes] = await Promise.all([
        axios.get("/api/features/media/image"),
        axios.get("/api/features/media/video"),
      ]);
      setHeroFeatures(heroRes.data);
      setVideoFeatures(videoRes.data);
    } catch (error) {
      console.error("Error fetching features:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch features",
        icon: "error",
      });
    }
  };

  const handleSwitchActive = async (feature) => {
    try {
      await axios.patch(`/api/features/${feature._id}`, {
        isActive: !feature.isActive,
      });
      fetchFeatures();
      Swal.fire({
        title: "Success!",
        text: `Feature ${
          feature.isActive ? "disabled" : "enabled"
        } successfully`,
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update feature status",
        icon: "error",
      });
    }
  };

  const handleUpdateOrder = async (feature, direction) => {
    try {
      await axios.patch(`/api/features/${feature._id}`, {
        order: direction === "up" ? feature.order - 1 : feature.order + 1,
      });
      fetchFeatures();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update feature order",
        icon: "error",
      });
    }
  };
  // Modified to sort features by order
  const getSortedFeatures = (features) => {
    return [...features].sort((a, b) => a.order - b.order);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (ev) => {
    const files = ev.target?.files;
    if (!files?.length) return;

    setIsUploading(true);
    const data = new FormData();

    if (isVideoMode) {
      if (!files[0].type.includes("video/")) {
        Swal.fire({
          title: "Invalid File",
          text: "Please upload a video file",
          icon: "error",
        });
        setIsUploading(false);
        return;
      }
      data.append("file", files[0]);
    } else {
      // For images, allow multiple
      Array.from(files).forEach((file) => {
        if (!file.type.includes("image/")) {
          Swal.fire({
            title: "Invalid File",
            text: "Please upload image files only",
            icon: "error",
          });
          setIsUploading(false);
          return;
        }
        data.append("file", file);
      });
    }

    data.append("type", isVideoMode ? "video" : "image");

    try {
      const res = await axios.post("/api/upload", data);
      setFormData((prev) => ({
        ...prev,
        mediaUrls: isVideoMode
          ? [res.data.links[0]]
          : [...prev.mediaUrls, ...res.data.links],
      }));
    } catch (error) {
      Swal.fire({
        title: "Upload Failed",
        text: "There was an error uploading your file(s)",
        icon: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // Validate required fields
    const requiredFields = ["title", "description"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0 || formData.mediaUrls.length === 0) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please fill in all required fields and upload media",
        icon: "warning",
      });
      return;
    }

    const data = {
      ...formData,
      type: isVideoMode ? "video" : "image",
    };

    try {
      if (editMode) {
        await axios.put(`/api/features/${selectedFeature._id}`, data);
      } else {
        await axios.post("/api/features", data);
      }

      resetForm();
      fetchFeatures();
      Swal.fire({
        title: "Success!",
        text: `Feature ${editMode ? "updated" : "created"} successfully`,
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to save feature",
        icon: "error",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      mediaUrls: [],
      buttonText: "",
      buttonLink: "",
    });
    setSelectedFeature(null);
    setEditMode(false);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    resetForm();
  };

  const editFeature = (feature) => {
    setSelectedFeature(feature);
    setFormData({
      title: feature.title,
      description: feature.description,
      mediaUrls: Array.isArray(feature.mediaUrls)
        ? feature.mediaUrls
        : [feature.mediaUrls],
      buttonText: feature.buttonText,
      buttonLink: feature.buttonLink,
    });
    setEditMode(true);
  };

  const deleteFeature = async (feature) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/features/${feature._id}`);
        fetchFeatures();
        Swal.fire({
          title: "Deleted!",
          text: "Feature has been deleted",
          icon: "success",
          timer: 1000,
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete feature",
          icon: "error",
        });
      }
    }
  };

  const renderMediaPreview = () => {
    return formData.mediaUrls.map((url, index) => (
      <div key={url} className="relative group">
        {isVideoMode ? (
          <video
            src={url}
            controls
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              mediaUrls: prev.mediaUrls.filter((item) => item !== url),
            }))
          }
          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ));
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Feature Management
              </h1>
              <p className="text-gray-500">
                Manage your hero and video banners
              </p>
            </div>
            <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
              {["hero", "video"].map((tab) => (
                <motion.button
                  key={tab}
                  variants={tabVariants}
                  animate={activeTab === tab ? "active" : "inactive"}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Banners
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editMode
                    ? `Edit ${activeTab} Banner`
                    : `Add New ${activeTab} Banner`}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {["title", "description", "buttonText", "buttonLink"].map(
                    (field) => (
                      <div key={field} className="space-y-1">
                        <input
                          type="text"
                          name={field}
                          placeholder={
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }
                          value={formData[field]}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                      </div>
                    )
                  )}
                </div>

                <ImageUpload
                  onUpload={handleUpload}
                  isUploading={isUploading}
                  accept={isVideoMode ? "video/*" : "image/*"}
                  multiple={!isVideoMode}
                />

                <div
                  className={`grid ${
                    isVideoMode ? "" : "grid-cols-2 md:grid-cols-3"
                  } gap-4`}
                >
                  {renderMediaPreview()}
                </div>

                {editMode && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          isActive: !prev.isActive,
                        }))
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.isActive ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-600">
                      {formData.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  {editMode && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    {editMode ? "Update Banner" : "Add Banner"}
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="grid gap-4 md:grid-cols-2"
            variants={containerVariants}
          >
            {getSortedFeatures(
              activeTab === "hero" ? heroFeatures : videoFeatures
            ).map((feature) => (
              <motion.div
                key={feature._id}
                variants={itemVariants}
                className={`bg-white rounded-xl shadow-sm p-4 ${
                  !feature.isActive ? "opacity-60" : ""
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* ... inside the mapped features section, replace the comment with: */}
                <div className="flex flex-col h-full">
                  {/* Header with controls */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {feature.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSwitchActive(feature)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                        title={feature.isActive ? "Disable" : "Enable"}
                      >
                        <Power
                          size={18}
                          className={
                            feature.isActive
                              ? "text-green-500"
                              : "text-gray-400"
                          }
                        />
                      </button>
                      <button
                        onClick={() => editFeature(feature)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteFeature(feature)}
                        className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Media preview */}
                  <div className="relative group mb-4 rounded-lg overflow-hidden">
                    {feature.type === "video" ? (
                      <video
                        src={
                          Array.isArray(feature.mediaUrls)
                            ? feature.mediaUrls[0]
                            : feature.mediaUrls
                        }
                        className="w-full h-48 object-cover rounded-lg"
                        controls
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {(Array.isArray(feature.mediaUrls)
                          ? feature.mediaUrls
                          : [feature.mediaUrls]
                        )
                          .slice(0, 4)
                          .map((url, index) => (
                            <img
                              key={url}
                              src={url}
                              alt={`${feature.title} ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {feature.description}
                    </p>

                    {/* Button preview if exists */}
                    {feature.buttonText && (
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          Button: {feature.buttonText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer with order controls */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      Order: {feature.order}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleUpdateOrder(feature, "up")}
                        disabled={feature.order === 0}
                        className={`p-1.5 rounded-lg transition-colors ${
                          feature.order === 0
                            ? "text-gray-300"
                            : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                        title="Move Up"
                      >
                        <MoveUp size={18} />
                      </button>
                      <button
                        onClick={() => handleUpdateOrder(feature, "down")}
                        disabled={
                          feature.order ===
                          (activeTab === "hero"
                            ? heroFeatures.length - 1
                            : videoFeatures.length - 1)
                        }
                        className={`p-1.5 rounded-lg transition-colors ${
                          feature.order ===
                          (activeTab === "hero"
                            ? heroFeatures.length - 1
                            : videoFeatures.length - 1)
                            ? "text-gray-300"
                            : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                        title="Move Down"
                      >
                        <MoveDown size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureAdmin;

// import React, { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Edit2, Trash2 } from "lucide-react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import ImageUpload from "@/components/ImageUpload";
// import { Switch } from "@/components/ui/switch";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 }
//   }
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1
//   }
// };

// const FeatureAdmin = ({ Swal }) => {
//   // Separate states for different feature types
//   const [heroFeatures, setHeroFeatures] = useState([]);
//   const [videoFeatures, setVideoFeatures] = useState([]);
//   const [activeTab, setActiveTab] = useState("hero");

//   // Form states
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     mediaUrls: [],
//     buttonText: "",
//     buttonLink: "",
//     isActive: true,
//     order: 0
//   });

//   const [isUploading, setIsUploading] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedFeature, setSelectedFeature] = useState(null);

//   // Determine if we're in video mode based on active tab
//   const isVideoMode = activeTab === "video";

//   useEffect(() => {
//     fetchFeatures();
//   }, []);

//   const fetchFeatures = async () => {
//     try {
//       const [heroRes, videoRes] = await Promise.all([
//         axios.get("/api/features/media/hero"),
//         axios.get("/api/features/media/video")
//       ]);
//       setHeroFeatures(heroRes.data);
//       setVideoFeatures(videoRes.data);
//     } catch (error) {
//       console.error("Error fetching features:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch features",
//         icon: "error"
//       });
//     }
//   };

//   const handleSwitchActive = async (feature) => {
//     try {
//       await axios.patch(`/api/features/${feature._id}`, {
//         isActive: !feature.isActive
//       });
//       fetchFeatures();
//       Swal.fire({
//         title: "Success!",
//         text: `Feature ${feature.isActive ? 'disabled' : 'enabled'} successfully`,
//         icon: "success",
//         timer: 1500
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "Failed to update feature status",
//         icon: "error"
//       });
//     }
//   };

//   const handleUpdateOrder = async (feature, direction) => {
//     try {
//       await axios.patch(`/api/features/${feature._id}`, {
//         order: direction === 'up' ? feature.order - 1 : feature.order + 1
//       });
//       fetchFeatures();
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "Failed to update feature order",
//         icon: "error"
//       });
//     }
//   };
//     // Modified to sort features by order
//     const getSortedFeatures = (features) => {
//       return [...features].sort((a, b) => a.order - b.order);
//     };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleUpload = async (ev) => {
//     const files = ev.target?.files;
//     if (!files?.length) return;

//     setIsUploading(true);
//     const data = new FormData();

//     if (isVideoMode) {
//       if (!files[0].type.includes("video/")) {
//         Swal.fire({
//           title: "Invalid File",
//           text: "Please upload a video file",
//           icon: "error"
//         });
//         setIsUploading(false);
//         return;
//       }
//       data.append("file", files[0]);
//     } else {
//       // For images, allow multiple
//       Array.from(files).forEach(file => {
//         if (!file.type.includes("image/")) {
//           Swal.fire({
//             title: "Invalid File",
//             text: "Please upload image files only",
//             icon: "error"
//           });
//           setIsUploading(false);
//           return;
//         }
//         data.append("file", file);
//       });
//     }

//     data.append("type", isVideoMode ? "video" : "image");

//     try {
//       const res = await axios.post("/api/upload", data);
//       setFormData(prev => ({
//         ...prev,
//         mediaUrls: isVideoMode ? [res.data.links[0]] : [...prev.mediaUrls, ...res.data.links]
//       }));
//     } catch (error) {
//       Swal.fire({
//         title: "Upload Failed",
//         text: "There was an error uploading your file(s)",
//         icon: "error"
//       });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();

//     // Validate required fields
//     const requiredFields = ["title", "description", "buttonText", "buttonLink"];
//     const missingFields = requiredFields.filter(field => !formData[field]);

//     if (missingFields.length > 0 || formData.mediaUrls.length === 0) {
//       Swal.fire({
//         title: "Missing Fields",
//         text: "Please fill in all required fields and upload media",
//         icon: "warning"
//       });
//       return;
//     }

//     const data = {
//       ...formData,
//       type: isVideoMode ? "video" : "image"
//     };

//     try {
//       if (editMode) {
//         await axios.put(`/api/features/${selectedFeature._id}`, data);
//       } else {
//         await axios.post("/api/features", data);
//       }

//       resetForm();
//       fetchFeatures();
//       Swal.fire({
//         title: "Success!",
//         text: `Feature ${editMode ? "updated" : "created"} successfully`,
//         icon: "success",
//         timer: 1500
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "Failed to save feature",
//         icon: "error"
//       });
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       description: "",
//       mediaUrls: [],
//       buttonText: "",
//       buttonLink: ""
//     });
//     setSelectedFeature(null);
//     setEditMode(false);
//   };

//   const handleTabChange = (value) => {
//     setActiveTab(value);
//     resetForm();
//   };

//   const editFeature = (feature) => {
//     setSelectedFeature(feature);
//     setFormData({
//       title: feature.title,
//       description: feature.description,
//       mediaUrls: Array.isArray(feature.mediaUrls) ? feature.mediaUrls : [feature.mediaUrls],
//       buttonText: feature.buttonText,
//       buttonLink: feature.buttonLink
//     });
//     setEditMode(true);
//   };

//   const deleteFeature = async (feature) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#dc2626"
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`/api/features/${feature._id}`);
//         fetchFeatures();
//         Swal.fire({
//           title: "Deleted!",
//           text: "Feature has been deleted",
//           icon: "success",
//           timer: 1000
//         });
//       } catch (error) {
//         Swal.fire({
//           title: "Error",
//           text: "Failed to delete feature",
//           icon: "error"
//         });
//       }
//     }
//   };

//   const renderMediaPreview = () => {
//     return formData.mediaUrls.map((url, index) => (
//       <div key={url} className="relative group">
//         {isVideoMode ? (
//           <video
//             src={url}
//             controls
//             className="w-full h-48 object-cover rounded-lg"
//           />
//         ) : (
//           <img
//             src={url}
//             alt={`Preview ${index + 1}`}
//             className="w-full h-48 object-cover rounded-lg"
//           />
//         )}
//         <button
//           type="button"
//           onClick={() => setFormData(prev => ({
//             ...prev,
//             mediaUrls: prev.mediaUrls.filter(item => item !== url)
//           }))}
//           className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//         >
//           <Trash2 size={16} />
//         </button>
//       </div>
//     ));
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-2 min-h-screen">
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-7xl mx-auto"
//       >
//         <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold">Feature Management</h1>
//               <p className="text-gray-500">Manage your hero and video banners</p>
//             </div>
//             <TabsList>
//               <TabsTrigger value="hero">Hero Banners</TabsTrigger>
//               <TabsTrigger value="video">Video Banners</TabsTrigger>
//             </TabsList>
//           </div>

//           {["hero", "video"].map((tabValue) => (
//             <TabsContent key={tabValue} value={tabValue} className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>
//                     {editMode ? `Edit ${tabValue} Banner` : `Add New ${tabValue} Banner`}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid gap-4 md:grid-cols-2">
//                       {["title", "description", "buttonText", "buttonLink"].map((field) => (
//                         <input
//                           key={field}
//                           type="text"
//                           name={field}
//                           placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                           value={formData[field]}
//                           onChange={handleInputChange}
//                           className="w-full rounded-lg border px-4 py-2"
//                         />
//                       ))}
//                     </div>

//                     <ImageUpload
//                       onUpload={handleUpload}
//                       isUploading={isUploading}
//                       accept={isVideoMode ? "video/*" : "image/*"}
//                       multiple={!isVideoMode}
//                     />

//                     <div className={`grid ${isVideoMode ? "" : "grid-cols-2 md:grid-cols-3"} gap-4`}>
//                       {renderMediaPreview()}
//                     </div>
//                        {/* Add isActive switch for edit mode */}
//                        {editMode && (
//                       <div className="flex items-center gap-2">
//                         <Switch
//                           checked={formData.isActive}
//                           onCheckedChange={(checked) =>
//                             setFormData(prev => ({ ...prev, isActive: checked }))
//                           }
//                         />
//                         <span className="text-sm text-gray-600">
//                           {formData.isActive ? 'Active' : 'Inactive'}
//                         </span>
//                       </div>
//                     )}

//                     <div className="flex justify-end gap-2">
//                       {editMode && (
//                         <button
//                           type="button"
//                           onClick={resetForm}
//                           className="px-4 py-2 rounded-lg border"
//                         >
//                           Cancel
//                         </button>
//                       )}
//                       <button
//                         type="submit"
//                         className="px-4 py-2 rounded-lg bg-primary text-white"
//                       >
//                         {editMode ? "Update Banner" : "Add Banner"}
//                       </button>
//                     </div>

//                   </form>
//                 </CardContent>
//               </Card>

//               <div className="grid gap-4 md:grid-cols-2">
//               {getSortedFeatures(tabValue === "hero" ? heroFeatures : videoFeatures)
//                   .map((feature) => (
//                   <motion.div
//                     key={feature._id}
//                     variants={itemVariants}
//                     className={`bg-white rounded-xl shadow-sm p-4 ${
//                       !feature.isActive ? 'opacity-60' : ''
//                     }`}
//                   >
//                     {isVideoMode ? (
//                       <video
//                         src={feature.mediaUrls[0]}
//                         controls
//                         className="w-full h-48 object-cover rounded-lg mb-4"
//                       />
//                     ) : (
//                       <img
//                         src={feature.mediaUrls[0]}
//                         alt={feature.title}
//                         className="w-full h-48 object-cover rounded-lg mb-4"
//                       />
//                     )}
//                     <h3 className="font-semibold">{feature.title}</h3>
//                     <p className="text-gray-500 text-sm">{feature.description}</p>
//                     {/* <div className="flex justify-end gap-2 mt-4">
//                       <button
//                         onClick={() => editFeature(feature)}
//                         className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
//                       >
//                         <Edit2 size={16} />
//                       </button>
//                       <button
//                         onClick={() => deleteFeature(feature)}
//                         className="p-2 text-red-500 hover:bg-red-50 rounded-full"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div> */}
//                     <div className="flex items-center justify-between mt-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleSwitchActive(feature)}
//                           className={`p-2 ${
//                             feature.isActive ? 'text-green-500' : 'text-gray-400'
//                           } hover:bg-gray-50 rounded-full`}
//                           title={feature.isActive ? 'Disable' : 'Enable'}
//                         >
//                           <Power size={16} />
//                         </button>

//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => handleUpdateOrder(feature, 'up')}
//                             className="p-2 text-gray-500 hover:bg-gray-50 rounded-full"
//                             disabled={feature.order === 0}
//                           >
//                             <MoveUp size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleUpdateOrder(feature, 'down')}
//                             className="p-2 text-gray-500 hover:bg-gray-50 rounded-full"
//                           >
//                             <MoveDown size={16} />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => editFeature(feature)}
//                           className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
//                         >
//                           <Edit2 size={16} />
//                         </button>
//                         <button
//                           onClick={() => deleteFeature(feature)}
//                           className="p-2 text-red-500 hover:bg-red-50 rounded-full"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </motion.div>
//     </div>
//   );
// };

// export default FeatureAdmin;
