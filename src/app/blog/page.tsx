import * as React from 'react';
import BlogPage from '../../../BlogPage';
import { getAllPosts } from '../../../lib/posts';

export default function Blog() {
  const posts = getAllPosts();
  return <BlogPage allPosts={posts} />;
}
