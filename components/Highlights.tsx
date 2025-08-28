import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const metadata = {
  robots: {
    index: false,
    follow: true
  }
}

const items = [
  {
    logo: '/people.png', // put your path here
    title: 'Zoho People',
    description: 'Streamline your HR operations, manage employee data, and automate tasks efficiently.',
  },
  {
    logo: '/books.png',
    title: 'Zoho Books',
    description: 'Manage your finances, track expenses, and automate accounting with ease.',
  },
  {
    logo: '/one.png',
    title: 'Zoho One',
    description: 'An all-in-one suite to run your business — includes 40+ integrated apps.',
  },
  {
    logo: '/crm.png',
    title: 'Zoho CRM',
    description: 'Grow your sales pipeline, close more deals, and retain customers better.',
  },
  {
    logo: '/creator.png',
    title: 'Zoho Creator',
    description: 'Easily build custom apps for unique business needs without writing code.',
  },
  {
    logo: '/inventory.png',
    title: 'Zoho Inventory',
    description: 'Track inventory, manage orders, and streamline your supply chain.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
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
          <Typography component="h2" variant="h4" gutterBottom>
            Zoho apps we implement
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Our ProTeam is ready to assist you in implementing and Customization:
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                  textAlign: 'left',
                }}
              >
                <Box
                  component="img"
                  src={item.logo}
                  alt={item.title}
                  sx={{
                    width: 80, // adjust as needed (smaller than height if logos are tall)
                    maxHeight: 40,
                    objectFit: 'contain',
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
