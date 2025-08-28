'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';


const dashboardImages = [
  '/components/Screens/dashboard1.png',
  '/components/Screens/dashboard2.png',
  '/components/Screens/dashboard3.png',
];

export default function ScreenRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === dashboardImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Image
        src={dashboardImages[currentIndex]}
        alt={`Dashboard ${currentIndex + 1}`}
        width={1000}
        height={600}
        style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
      />
    </div>
  );
}
