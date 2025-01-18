import ListAllProducts from '@/clients/ListAllProducts'

export const metadata = {
  title: `All Products | ${process.env.SITE_NAME}`,
  description:
    "Discover a wide range of high-quality beauty products and accessories, including Turmeric black soap, earrings, bags, and more, perfect for men and women.",
  openGraph: {
    title: `All Products | ${process.env.SITE_NAME}`,
    description:
      "Browse through our exclusive collection of beauty and accessory products. Find your favorites now!",
    type: "website",
    url: `${process.env.SITE_URL}/store/products`,
  },
  twitter: {
    card: "summary_large_image",
    title: `All Products | ${process.env.SITE_NAME}`,
    description:
      "Shop our premium collection of beauty and accessory products today.",
  },
};

export default function AllProducts() {

  return (
    <ListAllProducts />
  );
}
