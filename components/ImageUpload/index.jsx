// "use client"
// import React, { useCallback, useState, useRef } from 'react';
// import { Upload, X } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ImageUpload = ({ onUpload, isUploading }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleDrag = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }, []);

//   const handleDragIn = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   }, []);

//   const handleDragOut = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   }, []);

//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     const files = e.dataTransfer.files;
//     if (files?.length > 0) {
//       onUpload({ target: { files } });
//       console.log(files)
//     }
//   }, [onUpload]);

//   const handleFileSelect = useCallback((e) => {
//     const files = e.target.files;
//     if (files?.length > 0) {
//       onUpload({ target: { files } });
//       console.log(files)
//     }
//   }, [onUpload]);

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div
//     onClick={handleClick}
//       onDragEnter={handleDragIn}
//       onDragLeave={handleDragOut}
//       onDragOver={handleDrag}
//       onDrop={handleDrop}
//       className={`relative w-full h-48 border-2 border-dashed rounded-xl transition-all duration-200 
//         ${isDragging 
//           ? 'border-primaryAdmin bg-primaryAdmin/5' 
//           : 'border-stroke hover:border-primaryAdmin hover:bg-gray-50'
//         }`}
//     >
//       {/* <input
//         type="file"
//         onChange={onUpload}
//         multiple
//         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//         accept="image/*"
//       /> */}
//        <input
//         ref={fileInputRef}
//         type="file"
//         onChange={handleFileSelect}
//         multiple
//         className="hidden"
//         accept="image/*"
//       />
      
//       <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
//         <motion.div
//           initial={{ scale: 1 }}
//           animate={{ scale: isDragging ? 1.1 : 1 }}
//           className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
//         >
//           <Upload 
//             size={24} 
//             className={`${isDragging ? 'text-primaryAdmin' : 'text-gray-400'}`}
//           />
//         </motion.div>
        
//         <div className="text-center">
//           <p className="text-sm font-medium text-gray-700">
//             {isDragging ? 'Drop images here' : 'Drag and drop images here'}
//           </p>
//           <p className="text-xs text-gray-500 mt-1">
//             or click to select files
//           </p>
//         </div>

//         {isUploading && (
//           <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
//             <div className="flex items-center gap-2">
//               <div className="w-5 h-5 border-2 border-primaryAdmin border-t-transparent rounded-full animate-spin" />
//               <span className="text-sm text-gray-600">Uploading...</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;


"use client"
import React, { useCallback, useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageUpload = ({ onUpload, isUploading, accept = "image/*", multiple = true }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFiles = (files) => {
    const acceptedTypes = accept.split(',').map(type => type.trim());
    return Array.from(files).every(file => {
      return acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          const baseType = type.split('/')[0];
          return file.type.startsWith(`${baseType}/`);
        }
        return file.type === type;
      });
    });
  };

  const handleFiles = useCallback((files) => {
    if (files?.length > 0) {
      if (!validateFiles(files)) {
        // You might want to add a proper error handling UI here
        alert(`Please upload only ${accept} files`);
        return;
      }

      onUpload({ target: { files } });
    }
  }, [accept, onUpload]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  }, [handleFiles]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    handleFiles(files);
  }, [handleFiles]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getUploadText = () => {
    const fileType = accept.includes('video') ? 'videos' : 'images';
    return {
      drag: `Drop ${fileType} here`,
      normal: `Drag and drop ${fileType} here`
    };
  };

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative w-full h-48 border-2 border-dashed rounded-xl transition-all duration-200 
        ${isDragging 
          ? 'border-primaryAdmin bg-primaryAdmin/5' 
          : 'border-stroke hover:border-primaryAdmin hover:bg-gray-50'
        }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        multiple={multiple}
        className="hidden"
        accept={accept}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragging ? 1.1 : 1 }}
          className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <Upload 
            size={24} 
            className={`${isDragging ? 'text-primaryAdmin' : 'text-gray-400'}`}
          />
        </motion.div>
        
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            {isDragging ? getUploadText().drag : getUploadText().normal}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            or click to select {multiple ? "files" : "a file"}
          </p>
        </div>

        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primaryAdmin border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-600">Uploading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;