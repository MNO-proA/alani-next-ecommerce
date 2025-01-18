export default function VideoBanner() {
     return (
        <div className="relative w-full h-[650px] sm:h-[750px]">
        <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
        >
          <source src="/videos/alani-beauty.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-40"></div> 
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h2 className="text-4xl sm:text-6xl font-semibold mb-4">
            Limited Time Offers!
          </h2>
          <p className="text-lg mb-6">
            Shop the latest styles at amazing discounts!
          </p>
          <button className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-full hover:scale-105 duration-200">
            Shop Now
          </button>
        </div>
      </div>
    );
  }
  