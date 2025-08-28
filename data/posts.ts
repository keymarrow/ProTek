export type PostContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'img'; src: string; alt?: string };

export type Post = {
  id: string; // slug
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  content: PostContentBlock[];
};

export const categories = [
  'Latest',
  'Build In Public',
  'Case Studies',
  'Growth Hacking',
  'Technical',
  'CMS',
] as const;

export const posts: Post[] = [
  {
    id: 'reddit-customers',
    title:
      'How to Use Reddit to Find Customers Without Breaking Self‑Promotion Rules',
    excerpt:
      'Reddit is a goldmine for connecting with your ideal customers — if you know how to tap it correctly. This guide shows step‑by‑step tactics to leverage Reddit while avoiding self‑promotion penalties…',
    date: '26 May 2024',
    tags: ['mega‑guide', 'reddit', 'content‑distribution', 'growth', 'marketing'],
    category: 'Growth Hacking',
    content: [
      { type: 'p', text: 'Reddit communities (subreddits) can drive high‑intent traffic when you engage the right way. This guide walks through audience research, comment‑first engagement, and value‑led posts.' },
      { type: 'img', src: '/image1.png', alt: 'Reddit strategy diagram' },
      { type: 'h2', text: 'Set up listening' },
      { type: 'p', text: 'Use search operators to map relevant conversations and identify recurring problems. Start by saving 10–15 threads and note language your customers use.' },
      { type: 'img', src: '/image2.png', alt: 'Sample search results' },
      { type: 'p', text: 'Engage with comments first, then follow up with deep‑dive guides hosted on your site. Avoid direct pitches; focus on practical answers and templates.' },
    ],
  },
  {
    id: 'open-budgets',
    title: 'Stop Wasting Time on Tire‑Kickers: Find Startups with Open Budgets',
    excerpt:
      "Tired of demos that never convert? Learn how to systematically find, qualify, and close funded startups that actually need what you're selling…",
    date: '26 May 2024',
    tags: ['startup', 'prospecting', 'cold‑email', 'tools'],
    category: 'Case Studies',
    content: [
      { type: 'p', text: 'Prospects with budget and urgency close faster. This playbook shows signals you can track and how to structure short discovery loops.' },
      { type: 'img', src: '/image3.png', alt: 'Funnel visualization' },
      { type: 'p', text: 'Prioritize companies with recent funding rounds, new hiring, or public product changes. Combine with a 3‑step outreach to confirm timing and budget.' },
    ],
  },
  {
    id: 'headless-cms-choices',
    title: 'Choosing a Headless CMS: A Practical Guide for Teams',
    excerpt:
      'From content modeling to localization and deployment, here’s how to select a CMS that scales with your team and workflow…',
    date: '03 Jun 2024',
    tags: ['cms', 'content', 'architecture'],
    category: 'CMS',
    content: [
      { type: 'p', text: 'Picking a CMS is about trade‑offs. Model your content first, then shortlist platforms that support your workflows and governance.' },
    ],
  },
  {
    id: 'technical-seo-checklist',
    title: 'A Minimal Technical SEO Checklist for Product Teams',
    excerpt:
      'Improve crawlability, speed, and indexation without derailing your roadmap. A hands‑on checklist product teams can actually use…',
    date: '12 Jun 2024',
    tags: ['seo', 'performance', 'tooling'],
    category: 'Technical',
    content: [
      { type: 'p', text: 'A short list that keeps pages fast and indexable: sitemaps, structured data, core web vitals, and robust link architecture.' },
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.id === slug);
}

