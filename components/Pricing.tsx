import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export const metadata = {
  robots: {
    index: false,
    follow: true
  }
}


const tiers = [
  {
    title: 'Training',
    subline: 'Learn & Master Zoho Applications',
    description: [
      'Master Zoho with expert-led training',
      'Live remote sessions',
      'Explore key features & modules',
      'Intro to Zoho AI tools',
      'Best practices & tips',
    ],
    buttonText: 'Arrange Training',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
  {
    title: 'Consultation',
    subheader: 'Recommended',
    subline: 'Crafting the Right Solution',
    description: [
      'Tailored 1-on-1 sessions',
      'Detailed needs assessment',
      'Workflow process analysis',
      'Requirement documentation',
      'Feasibility & planning report',
    ],
    buttonText: 'Book Consultation',
    buttonVariant: 'contained',
    buttonColor: 'secondary',
  },
  {
    title: 'Customizations',
    subline: 'Build Your Perfect Zoho',
    description: [
      'Design custom workflows',
      'Implement automation',
      'UAT & user feedback support',
      'Tailored Zoho feature setup',
      'Team training & rollout',
    ],
    buttonText: 'Get Custom Setup',
    buttonVariant: 'outlined',
    buttonColor: 'primary',
  },
];

export default function Pricing() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Our Zoho Services
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          We help businesses make the most of Zoho. From 1:1 consultations and professional training <br /> to full app customization 
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
      >
        {tiers.map((tier) => (
          <Grid
            key={tier.title}
            size={{
              xs: 12,
              sm: tier.title === 'Enterprise' ? 12 : 6,
              md: 4,
            }}
          >
            <Card
              sx={[
                {
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                },
                tier.title === 'Professional' &&
                  ((theme) => ({
                    border: 'none',
                    background:
                      'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
                    boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                    ...theme.applyStyles('dark', {
                      background:
                        'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                      boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                    }),
                  })),
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    },
                    tier.title === 'Professional'
                      ? { color: 'grey.100' }
                      : { color: '' },
                  ]}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === 'Professional' && (
                    <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                  )}
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={[
                    { mt: 1 },
                    tier.title === 'Professional'
                      ? { color: 'grey.100' }
                      : { color: 'text.secondary' },
                  ]}
                >
                  {tier.subline}
                </Typography>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                  >
                    <CheckCircleRoundedIcon
                      sx={[
                        {
                          width: 20,
                        },
                        tier.title === 'Professional'
                          ? { color: 'primary.light' }
                          : { color: 'primary.main' },
                      ]}
                    />
                    <Typography
                      variant="subtitle2"
                      component={'span'}
                      sx={[
                        tier.title === 'Professional'
                          ? { color: 'grey.50' }
                          : { color: null },
                      ]}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant as 'outlined' | 'contained'}
                  color={tier.buttonColor as 'primary' | 'secondary'}
                  onClick={handleOpen}
                  sx={
                    tier.title === 'Consultation'
                      ? {
                          backgroundColor: '#1A73E8',
                          '&:hover': {
                            backgroundColor: '#1669C1',
                          },
                          color: '#fff',
                        }
                      : {}
                  }
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Calendly Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="calendly-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 600 },
            height: 600,
            bgcolor: 'background.paper',
            borderRadius: 1, // ← Add this
            boxShadow: 24,
            p: 0,
            outline: 'none',
            overflow: 'hidden', // ← Add this to clip iframe corners
          }}
        >
          <iframe
            src="https://calendly.com/kimaro/30-mints"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule Appointment"
          />
        </Box>
      </Modal>
    </Container>
  );
}