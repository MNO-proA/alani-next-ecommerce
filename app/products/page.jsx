import { mongooseConnect } from "@/lib/mongoose";


import { Product } from "@/models/Product";
import Link from "next/link";

import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";

export const metadata = {
  title: `All Products | ${process.env.SITE_NAME}`,
  description:
    "Explore our collection of top-quality products for men and women.",
};

export default async function AllProducts() {
  // Fetch products from the database
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } })
    .populate("category")
    .lean();

  // Convert `_id` to string (plain objects only)
  const clientProducts = JSON.parse(JSON.stringify(products));

  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-5">
        {/* Header section */}
        <div className="text-center mb-16">
          <p className="text-sm text-primary">Our Collection</p>
          <h1 className="text-3xl font-bold mt-2">All Products</h1>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-36 place-items-center mt-28 mb-32 ">
          {clientProducts.map((product) => (
            
              <div
                data-aos="zoom-in"
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px] cursor-pointer"
                key={product._id}
              >
                <Link href={`/product/${product._id}`}>
                {/* Image section */}
                <div className="h-[100px]">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={140} // You can adjust this value according to your needs
                    height={100} // Adjust the height as well
                    className="block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                    priority // Optionally add this if it's a critical image to preload
                    sizes="(max-width: 640px) 100vw, 140px" // Ensures the image is responsive
                  />
                </div>

                {/* Details section */}
                <div className="p-6 text-center">
                  <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                  <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="font-bold text-lg">${product.price}</span>
                    <span className="text-sm text-gray-500 group-hover:text-gray-300">
                      {product.category.name}
                    </span>
                  </div>
                  
                </div>
                </Link>
                {/* Centering Add to Cart Button */}
              <div className="flex justify-center items-center mb-5">
                <AddToCartButton
                  product={product}
                  className="w-[250px] group-hover:bg-white group-hover:text-primary"
                  iconSize={18}
                  buttonText="Add to Cart"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
