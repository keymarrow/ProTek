import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // <-- FIXED: import Grid directly
import Typography from '@mui/material/Typography';

const logos = [
  '/createch.png',
  '/stellartech.png',
  '/createch.png',
  '/stellartech.png',
];

export default function LogoCollection() {
  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        sx={{ color: 'text.secondary', mb: 2 }}
      >
        Trusted by the best companies
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
      {logos.map((logo, index) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 2 }}
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={logo}
            alt={`Logo ${index + 1}`}
            style={{
              height: '60px',
              maxWidth: '120px',
              objectFit: 'contain',
            }}
          />
        </Grid>
      ))}
    </Grid>
    </Box>
  );
}