// import AlaniStore from '@/clients/AlaniStore';

// export const metadata = {
//   title: `${process.env.SITE_NAME}`,
//   description:
//     "Explore our collection of top-quality products for men and women.",
// };

// export default function Home() {
//   return (
//       <AlaniStore/>
//   );
// }



import Head from 'next/head';
import AlaniStore from '@/clients/AlaniStore';

export const metadata = {
  title: `${process.env.SITE_NAME}`,
  description:
    "Explore Alani, your go-to beauty and accessories shop for Turmeric black soap, bags, earrings, and more.",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {/* Add more meta tags as needed */}
      </Head>
      <AlaniStore/>
      {/* Your home page content goes here */}
    </>
  );
}
