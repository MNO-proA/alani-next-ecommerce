
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the correct router from 'next/navigation'
import Hero from '../components/Hero';
import Subscribe from '../components/Subscribe';
import CategoryCarousel from "@/components/CategoryCarousel";

export default function Home() {
  const router = useRouter();


  useEffect(() => {
    // Check if we are in the browser environment and window is available
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (pathname.includes('admin')) {
        // Redirect to /admin if the pathname includes "admin"
        router?.push('/admin');
      }
    }
  }, [router]);

  return (
    <div>
      <Hero />
      <CategoryCarousel />
      <Subscribe />
    </div>
  );
}



