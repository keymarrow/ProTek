import * as React from 'react';
import { getAllPosts, getPost } from '../../../../lib/posts';
import BlogPostClient from '../../../../components/BlogPostClient';

export function generateStaticParams() {
  const list = getAllPosts();
  return list.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return null;
  const list = getAllPosts();
  const index = list.findIndex((p) => p.slug === post.slug);
  const prev = index > 0 ? list[index - 1] : undefined;
  const next = index < list.length - 1 ? list[index + 1] : undefined;
  return <BlogPostClient post={{
    id: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    tags: post.tags,
    category: post.category,
    content: [],
  }} prev={prev && { id: prev.slug, title: prev.title }} next={next && { id: next.slug, title: next.title }} html={post.html} />;
}
