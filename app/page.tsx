'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button/Button';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Design System</span>
        </h1>
        
        <p className="mt-3 text-2xl">
          Get started by logging in
        </p>

        <div className="mt-8">
           <Button variant="primary" onClick={() => router.push('/login')}>Go to Login</Button>
        </div>
      </main>
    </div>
  );
}
