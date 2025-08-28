"use client";
import * as React from 'react';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import NextLink from 'next/link';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  content?: any[];
};

type NavPost = { id: string; title: string };

export default function BlogPostClient({ post, prev, next, html }: { post: Post; prev?: NavPost; next?: NavPost; html?: string }) {
  return (
    <AppTheme>
      <AppAppBar />
      <Container maxWidth="md" sx={{ pt: { xs: 12, md: 14 }, pb: 8 }}>
        <Button component={NextLink} href="/blog/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
          Back
        </Button>
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
            {post.tags.map((t) => (
              <Chip key={t} label={`#${t}`} size="small" variant="outlined" />
            ))}
          </Stack>
          <Typography variant="h3" sx={{ fontWeight: 700 }} gutterBottom>
            {post.title}
          </Typography>
          <Typography color="text.secondary">{post.date}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {html ? (
          <Box sx={{ '& img': { width: '100%', borderRadius: 2, boxShadow: 1 }, '& p': { lineHeight: 1.8 } }} dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <Box sx={{ display: 'grid', gap: 2 }}>
            {(post.content ?? []).map((block, i) => {
              if (block.type === 'p') {
                return (
                  <Typography key={i} component="p" sx={{ lineHeight: 1.8 }}>
                    {block.text}
                  </Typography>
                );
              }
              if (block.type === 'h2') {
                return (
                  <Typography key={i} variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
                    {block.text}
                  </Typography>
                );
              }
              if (block.type === 'img') {
                return (
                  <Box
                    key={i}
                    component="img"
                    src={block.src}
                    alt={block.alt || ''}
                    sx={{ width: '100%', borderRadius: 2, boxShadow: 1 }}
                  />
                );
              }
              return null;
            })}
          </Box>
        )}
      </Container>
      <Divider sx={{ mt: 6 }} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Related Posts
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          {[prev, next].filter(Boolean).map((p) => (
            <Card key={(p as NavPost).id} variant="outlined" sx={{ height: '100%', display: 'flex' }}>
              <CardActionArea component={NextLink} href={`/blog/${(p as NavPost).id}/`} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Box aria-hidden sx={{ height: 120, borderRadius: 2, bgcolor: 'action.hover' }} />
                </Box>
                <CardContent sx={{ pt: 0 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>
                    {(p as NavPost).title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Read Full Story
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
      <Divider />
      <Footer />
    </AppTheme>
  );
}
