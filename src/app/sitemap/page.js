"use client"; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SitemapPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/api/sitemap');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to sitemap...</p>
    </div>
  );
}
