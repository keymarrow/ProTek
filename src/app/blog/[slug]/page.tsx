import * as React from 'react';
import { getAllPosts, getPost } from '../../../../lib/posts';
import BlogPostClient from '../../../../components/BlogPostClient';
import Script from 'next/script';

export function generateStaticParams() {
  const list = getAllPosts();
  return list.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return null;
  const list = getAllPosts();
  const index = list.findIndex((p) => p.slug === post.slug);
  const prev = index > 0 ? list[index - 1] : undefined;
  const next = index < list.length - 1 ? list[index + 1] : undefined;
  const site = 'https://protek.co.tz';
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}/blog/` },
    ],
  };
  return (
    <>
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumb)}
      </Script>
      <BlogPostClient
        post={{
          id: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          tags: post.tags,
          category: post.category,
          content: [],
        }}
        prev={prev && { id: prev.slug, title: prev.title, cover: prev.cover }}
        next={next && { id: next.slug, title: next.title, cover: next.cover }}
        html={post.html}
      />
    </>
  );
}
