"use client";
import * as React from 'react';
import AppTheme from './shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NextLink from 'next/link';
import type { PostMeta } from './lib/posts';

function PostCard({
  post,
}: {
  post: { id: string; title: string; excerpt: string; date: string; tags: string[]; cover?: string };
}) {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex' }}>
      <CardActionArea
        component={NextLink}
        href={`/blog/${post.id}/`}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}
      >
        <Box sx={{ p: 2 }}>
          {post.cover ? (
            <Box
              component="img"
              src={post.cover}
              alt=""
              sx={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 1,
              }}
            />
          ) : (
            <Box
              aria-hidden
              sx={{
                height: 180,
                borderRadius: 2,
                bgcolor: 'action.hover',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light}22, ${theme.palette.primary.main}22)`,
              }}
            />
          )}
        </Box>
        <CardContent sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            {post.tags.slice(0, 5).map((tag) => (
              <Chip key={tag} size="small" label={`#${tag}`} variant="outlined" />
            ))}
          </Stack>
          <Typography variant="h6" gutterBottom>{post.title}</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {post.excerpt}
          </Typography>
          <Typography variant="body2" color="text.secondary">{post.date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function BlogPage({ allPosts }: { allPosts: PostMeta[] }) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, value: number) => setTab(value);

  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(allPosts.map((p) => p.category)));
    return ['Latest', ...cats];
  }, [allPosts]);

  const currentCategory = categories[tab];
  const base = allPosts;
  const filtered = currentCategory === 'Latest' ? base : base.filter((p) => p.category === currentCategory);

  return (
    <AppTheme>
      <AppAppBar />
      <Container sx={{ pt: { xs: 12, md: 14 }, pb: 8 }} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{ fontWeight: 700 }} gutterBottom>
            ProTek Blog
          </Typography>
          <Typography color="text.secondary">
            Lessons on using modern tools and automation to grow businesses.
          </Typography>
          <Typography color="text.secondary">
            Articles proudly published by ProTek.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
            {categories.map((c) => (
              <Tab key={c} label={c} />
            ))}
          </Tabs>
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
            alignItems: 'stretch',
          }}
        >
          {filtered.map((p) => (
            <Box key={p.slug} sx={{ display: 'flex' }}>
              <PostCard
                post={{
                  id: p.slug,
                  title: p.title,
                  excerpt: p.excerpt,
                  date: p.date,
                  tags: p.tags,
                  cover: p.cover,
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
      <Divider />
      <Footer />
    </AppTheme>
  );
}
