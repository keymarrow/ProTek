import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import visuallyHidden from '@mui/utils/visuallyHidden';
import styles from './Hero.module.css';

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    if (!email) {
      setError('Please enter an email address');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await fetch("https://formspree.io/f/mgvygkaa", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
        setEmail('');
      } else {
        const data = await response.json();
        throw new Error(data?.message || "Submission failed");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (glowRef.current) {
        glowRef.current.classList.remove(styles.glowEffect);
        void glowRef.current.offsetWidth;
        glowRef.current.classList.add(styles.glowEffect);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 0 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Go&nbsp;Paperless&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              With&nbsp;ZOHO
            </Typography>
          </Typography>

          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            We handle everything from setup to custom solutions—so you can start using Zoho with ease and confidence.
          </Typography>

          {success && <Alert severity="success">Thanks! We’ll contact you soon.</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: '100%', sm: '350px' }, mx: 'auto' }}
            >
              <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
                Email
              </InputLabel>
              <TextField
                id="email-hero"
                hiddenLabel
                size="small"
                variant="outlined"
                aria-label="Enter your email address"
                placeholder="Your email address"
                fullWidth
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                sx={{ minWidth: 'fit-content' }}
              >
                Schedule a Demo
              </Button>
            </Stack>
          </form>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            Drop your email to book a meeting with our experts.
          </Typography>
        </Stack>

        <Box
          ref={glowRef}
          className={styles.glowEffect}
          sx={{
            alignSelf: 'center',
            width: '100%',
            maxWidth: 1000,
            mt: 8,
            borderRadius: 2,
            overflow: 'hidden',
            '@media (min-width:600px)': {
              mt: 10,
            },
          }}
        >
          <video
            src="/videoplayback.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 'inherit',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}