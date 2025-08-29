import fs from 'fs';
import path from 'path';

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  cover?: string;
};

export type PostFull = PostMeta & { markdown: string; html: string };

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

function dateOnly(input: any): string {
  if (typeof input === 'string') {
    const m = input.match(/\d{4}-\d{2}-\d{2}/);
    if (m) return m[0];
  }
  try {
    const d = new Date(input);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

function parseFrontMatter(src: string): { data: any; content: string } {
  const fmStart = src.indexOf('---');
  if (fmStart !== 0) return { data: {}, content: src };
  const fmEnd = src.indexOf('\n---', 3);
  if (fmEnd === -1) return { data: {}, content: src };
  const raw = src.slice(3, fmEnd).trim();
  const content = src.slice(fmEnd + 4).trim();
  const data: Record<string, any> = {};
  for (const line of raw.split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value: any = line.slice(idx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s: string) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      value = value.replace(/^['"]|['"]$/g, '');
    }
    data[key] = value;
  }
  return { data, content };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function markdownToHtml(md: string): string {
  // Basic conversions; order matters
  let html = md.trim();
  // code inline
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // images ![alt](src)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  // links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // italic
  html = html.replace(/(^|\s)\*([^*]+)\*(?=\s|$)/g, '$1<em>$2</em>');
  // headings
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
  // unordered lists
  html = html.replace(/(?:^|\n)(-\s.+(?:\n-\s.+)*)/g, (block) => {
    const items = block
      .trim()
      .split(/\n/)
      .map((l) => l.replace(/^-\s+/, ''))
      .map((t) => `<li>${t}</li>`) // no escaping to keep simple formatting
      .join('');
    return `\n<ul>${items}</ul>`;
  });
  // paragraphs: split on blank lines, and within paragraphs
  // convert single newlines to <br /> so editor line breaks are preserved
  html = html
    .split(/\n{2,}/)
    .map((blk) =>
      blk.match(/^<h\d|^<ul|^<img/)
        ? blk
        : `<p>${blk.replace(/\n/g, '<br />')}</p>`
    )
    .join('\n');
  return html;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort();
  return files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data, content } = parseFrontMatter(raw);
    const meta: PostMeta = {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || content.split(/\n\n/)[0].slice(0, 180) + '…',
      date: data.date ? dateOnly(data.date) : new Date().toISOString().slice(0, 10),
      tags: Array.isArray(data.tags)
        ? data.tags
        : typeof data.tags === 'string' && data.tags
        ? data.tags.split(',').map((s: string) => s.trim())
        : [],
      category: data.category || 'General',
      cover: data.cover,
    };
    return meta;
  });
}

export function getPost(slug: string): PostFull | undefined {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = parseFrontMatter(raw);
  const meta: PostMeta = {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || content.split(/\n\n/)[0].slice(0, 180) + '…',
    date: data.date ? dateOnly(data.date) : new Date().toISOString().slice(0, 10),
    tags: Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === 'string' && data.tags
      ? data.tags.split(',').map((s: string) => s.trim())
      : [],
    category: data.category || 'General',
    cover: data.cover,
  };
  const html = markdownToHtml(content);
  return { ...meta, markdown: content, html };
}
