// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'alani-next-ecommerce.s3.amazonaws.com', // Your image hostname
//           port: '',
//           pathname: '/**', // This allows any image path under this domain
//         },
//       ],
//     },
//     experimental: {
//       serverActions: {
//         bodySizeLimit: '50mb',
//       },
//     },
//   };
  
//   export default nextConfig;
  /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alani-next-ecommerce.s3.amazonaws.com', // Your image hostname
        port: '',
        pathname: '/**', // This allows any image path under this domain
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async rewrites() {
    return [
      {
        source: '/store/checkout', // The URL path Paystack redirects to
        destination: '/store/checkout/index', // The actual location of the file in your app
      },
    ];
  },
};

export default nextConfig;
