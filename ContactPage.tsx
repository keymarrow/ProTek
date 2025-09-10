"use client";
import * as React from 'react';
import AppTheme from './shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/X';

export default function ContactPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<null | 'success' | 'error'>(null);
  const [statusMsg, setStatusMsg] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setStatus(null);
    setStatusMsg('');
    try {
      const data = new FormData(form);
      const res = await fetch('https://formspree.io/f/mandvpnn', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const json: any = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('success');
        setStatusMsg('Thanks! Your message has been sent.');
        form.reset();
      } else {
        setStatus('error');
        setStatusMsg(json?.errors?.[0]?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMsg('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <AppTheme>
      <AppAppBar />
      <Container sx={{ pt: { xs: 12, md: 14 }, pb: 6 }} maxWidth="lg">
        <Grid container spacing={3} alignItems="stretch">
          {/* Left: Form */}
          <Grid size={{ xs: 12, md: 7, lg: 7 }}>
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                bgcolor: 'background.default',
                height: '100%',
              }}
            >
              <Typography variant="overline" color="primary" sx={{ letterSpacing: 1.2 }}>
                Contact
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                Let's get in touch
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                You can reach us at{' '}
                <Link href="mailto:zoho@protek.co.tz" color="primary">
                  zoho@protek.co.tz
                </Link>
              </Typography>

              {/* Formspree submission */}
              <Box
                component="form"
                name="contact"
                method="POST"
                action="#"
                noValidate
                onSubmit={handleSubmit}
              >
                {/* Optional helpers for email subject and redirect */}
                <input type="hidden" name="subject" value="New contact from Proteknologies website" />
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="First Name" name="first_name" fullWidth size="small" InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Last Name" name="last_name" fullWidth size="small" InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField label="Email" type="email" name="email" fullWidth size="small" required InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Phone Number" name="phone" fullWidth size="small" InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Country" name="country" fullWidth size="small" InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Message"
                      name="message"
                      fullWidth
                      multiline
                      minRows={3}
                      size="small"
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel
                      control={<Checkbox name="consent" />}
                      label={
                        <Typography variant="body2">
                          You agree to our{' '}
                          <Link href="#" underline="hover">
                            terms and conditions
                          </Link>
                          .
                        </Typography>
                      }
                    />
                  </Grid>
                  {status && (
                    <Grid size={{ xs: 12 }}>
                      <Alert severity={status} aria-live="polite">{statusMsg}</Alert>
                    </Grid>
                  )}
                  <Grid size={{ xs: 12 }}>
                    <Button type="submit" variant="contained" size="medium" fullWidth sx={{ py: 1 }} disabled={submitting}>
                      {submitting ? 'Sending…' : 'Get Started'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Middle: Stats */}
          <Grid size={{ xs: 12, md: 3, lg: 3 }}>
            <Paper
              variant="outlined"
              sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: 'background.default', height: '100%' }}
            >
              <Stack spacing={2.5} divider={<Divider flexItem />}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
                    2+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Years <Link href="#" underline="hover">Experience</Link>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
                    10+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Projects <Link href="#" underline="hover">Delivered Around the World</Link>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
                    99%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Client Satisfaction
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
                    10
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mins <Link href="#" underline="hover">Response Time</Link>
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Right: Contact info */}
          <Grid size={{ xs: 12, md: 2, lg: 2 }}>
            <Paper
              variant="outlined"
              sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: 'background.default', height: '100%' }}
            >
              <Stack spacing={3}>
                <Box>
                  <HeadsetMicOutlinedIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>Contact Info</Typography>
                  <Typography variant="body2" color="text.secondary">+255 692 109 164</Typography>
                  <Typography variant="body2" color="text.secondary">zoho@protek.co.tz</Typography>
                </Box>
                <Divider />
                <Box>
                  <RoomOutlinedIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>Visit our office</Typography>
                  <Typography variant="body2" color="text.secondary">Ubungo External</Typography>
                  <Typography variant="body2" color="text.secondary">Dar es Salaam, Tanzania</Typography>
                </Box>
                <Divider />
                <Stack direction="row" spacing={1} alignItems="center">
                  <LinkedInIcon color="primary" />
                  <Link href="https://www.linkedin.com/company/proteknologies" target="_blank" rel="noopener noreferrer">
                    linkedin
                  </Link>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <InstagramIcon color="primary" />
                  <Link href="https://instagram.com/proteknologies" target="_blank" rel="noopener noreferrer">
                    instagram
                  </Link>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TwitterIcon color="primary" />
                  <Link href="https://x.com/proteknologies" target="_blank" rel="noopener noreferrer">
                    twitter
                  </Link>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <Footer />
    </AppTheme>
  );
}
