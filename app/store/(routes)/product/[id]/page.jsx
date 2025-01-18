// import { Star, ShoppingCart, Share2 } from 'lucide-react';
// import { notFound } from 'next/navigation';
// import ProductImageCarousel from '../../../components/ProductImageCarousel';

// // Updated ProductsData with multiple images
// const ProductsData = [
//   {
//     id: 1,
//     images: [
//       "/images/shirt/shirt.png",
//       "/images/shirt/shirt2.png",
//       "/images/shirt/shirt3.png",
//     ],
//     title: "Casual Wear",
//     price: 29.99,
//     rating: 4,
//     description:
//       "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["White", "Black", "Blue"],
//     details: [
//       "100% Cotton",
//       "Machine washable",
//       "Comfortable fit",
//       "Available in multiple sizes",
//       "Premium quality material"
//     ]
//   },
// ];

// export async function generateStaticParams() {
//   return ProductsData.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

// export async function generateMetadata({ params }) {
//   const { id } = await params;
//   const product = ProductsData.find(p => p.id.toString() === id);

//   if (!product) {
//     return {
//       title: 'Product Not Found',
//     };
//   }

//   return {
//     title: `${product.title} | Alani Beauty Shop`,
//     description: product.description,
//     openGraph: {
//       title: product.title,
//       description: product.description,
//       images: [product.images[0]], // Using first image as preview
//     },
//   };
// }

// export default async function ProductPage({ params }) {
//   const { id } = await params;
//   const product = ProductsData.find(p => p.id.toString() === id);

//   if (!product) {
//     notFound();
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4 py-16">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Product Image Carousel */}
//           <div className="lg:w-1/2">
//             <ProductImageCarousel images={product.images} />
//           </div>

//           {/* Product Info */}
//           <div className="lg:w-1/2">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
//               <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

//               {/* Rating */}
//               {/* <div className="flex items-center gap-2 mb-4">
//                 {[...Array(product.rating)].map((_, index) => (
//                   <Star
//                     key={index}
//                     size={20}
//                     className="fill-yellow-500 text-yellow-500"
//                   />
//                 ))}
//                 <span className="text-gray-500">({product.rating}/5)</span>
//               </div> */}

//               <p className="text-2xl font-bold text-primary mb-6">
//                 ${product.price}
//               </p>

//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 {product.description}
//               </p>

//               {/* Action Buttons */}
//               <div className="flex gap-4">
//                 <button className="flex-1 bg-primary text-white py-3 rounded-full flex items-center justify-center gap-2 hover:opacity-90">
//                   <ShoppingCart size={20} />
//                   Add to Cart
//                 </button>
//                 <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary">
//                   <Share2 size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { mongooseConnect } from "@/lib/mongoose";
// import { AddToCartButton } from "@/components/AddToCartButton";
// import { Product } from "@/models/Product";
// import { notFound } from "next/navigation";
// import ProductImageCarousel from "@/components/ProductImageCarousel";
// import { Share2 } from "lucide-react";


// export async function generateMetadata({ params }) {
//   const { id } = await params;

//   // Connect to database and fetch product
//   await mongooseConnect();
//   const product = await Product.findById(id).populate("category").lean();

//   if (!product) {
//     return {
//       title: "Product Not Found",
//     };
//   }

//   return {
//     title: `${product.title} | ${process.env.SITE_NAME}`,
//     description: product.description,
//     openGraph: {
//       title: product.title,
//       description: product.description,
//       images: [product.images[0]], // Using the first image as a preview
//     },
//   };
// }

// export default async function ProductPage({ params }) {
//   const { id } = await params;

//   // Connect to database and fetch product
//   await mongooseConnect();
//   const product = await Product.findById(id).populate("category").lean();

//   // If the product is not found, show a 404 page
//   if (!product) {
//     notFound();
//   }

//   const clientproduct = JSON.parse(JSON.stringify(product))


//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4 py-16">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Product Image Carousel */}
//           <div className="lg:w-1/2">
//             <ProductImageCarousel images={product?.images} />
//           </div>

//           {/* Product Info */}
//           <div className="lg:w-1/2">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
//               <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>

//               <p className="text-2xl font-bold text-primary mb-6">
//                 ${product?.price}
//               </p>

//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 {product?.description}
//               </p>

//               <p className="text-sm text-gray-500 mb-4">
//                 Category: {product?.category?.name || "Uncategorized"}
//               </p>

//               {/* Action Buttons */}
//               <div className="flex gap-4">
//                 {/* <button
//                   className="flex-1 bg-primary text-white py-3 rounded-full flex items-center justify-center gap-2 hover:opacity-90"
//                   onClick={() => addToCart(product)}
//                 >
//                   <ShoppingCart size={20} />
//                   Add to Cart
//                 </button> */}
//                     <AddToCartButton
//                     product={clientproduct}
//                     className="flex-1 bg-primary text-white py-3 hover:opacity-90"
//                     iconSize={20}
//                     buttonText="Add to Cart"
//                   />
//                 <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary">
//                   <Share2 size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { mongooseConnect } from "@/lib/mongoose";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Product } from "@/models/Product";
import { notFound } from "next/navigation";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import { Share2 } from "lucide-react";

export async function generateMetadata({ params }) {
  const { id } = await params;

  // Connect to the database and fetch product
  await mongooseConnect();
  const product = await Product.findById(id).populate("category").lean();

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `${product.title} | ${process.env.SITE_NAME}`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images ? [product.images[0]] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      image: product.images ? product.images[0] : null,
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  // Connect to the database and fetch product
  await mongooseConnect();
  const product = await Product.findById(id).populate("category").lean();

  if (!product) {
    notFound();
  }

  const clientproduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image Carousel */}
          <div className="lg:w-1/2">
            <ProductImageCarousel images={product?.images} />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
              <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>

              <p className="text-2xl font-bold text-primary mb-6">
                ${product?.price}
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {product?.description}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Category: {product?.category?.name || "Uncategorized"}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <AddToCartButton
                  product={clientproduct}
                  className="flex-1 bg-primary text-white py-3 hover:opacity-90"
                  iconSize={20}
                  buttonText="Add to Cart"
                />
                <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
