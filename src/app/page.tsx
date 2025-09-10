import * as React from 'react';
import MarketingPage from '../../MarketingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proteknologies Limited — Zoho Partner in Tanzania',
  description: 'Zoho implementation, customization, and automation for businesses in Tanzania and beyond. Start fast with our expert team.',
};



export default function Home() {
  return (
    <>
      <MarketingPage />
    </>
  );
}
