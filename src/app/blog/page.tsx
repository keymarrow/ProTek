import * as React from 'react';
import BlogPage from '../../../BlogPage';
import { getAllPosts } from '../../../lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Proteknologies Limited',
  description: 'Let learn Zoho In Tanzania way. Tips, tricks and updates.',
  alternates: {
    canonical: 'https://protek.co.tz/blog/',
  },
};

export default function Blog() {
  const posts = getAllPosts();
  return <BlogPage allPosts={posts} />;
}
