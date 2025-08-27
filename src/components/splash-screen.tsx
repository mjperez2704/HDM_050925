
"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';

type SplashScreenProps = {
  onFinished: () => void;
};

export function SplashScreen({ onFinished }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinished();
    }, 5000); // 5 segundos

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="animate-pulse">
        <Image
          src="https://hospitaldelmovil.mega-shop-test.shop/shared/logo.png"
          alt="Company Logo"
          width={800}
          height={400}
          data-ai-hint="logo"
          priority
        />
      </div>
    </div>
  );
}
