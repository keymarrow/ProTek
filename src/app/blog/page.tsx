import * as React from 'react';
import BlogPage from '../../../BlogPage';
import { getAllPosts } from '../../../lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Proteknologies Limited',
  description: 'Articles and guides on Zoho, automation, and growing your business.',
};

export default function Blog() {
  const posts = getAllPosts();
  return <BlogPage allPosts={posts} />;
}
