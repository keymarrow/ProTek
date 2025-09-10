"use client";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from './SitemarkIcon';
import NextLink from 'next/link';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 1.5, gap: 1 }}>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ fontSize: '0.95rem', fontWeight: 600 }}
                component={NextLink}
                href="/#features"
              >
                Process
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ fontSize: '0.95rem', fontWeight: 600 }}
                component={NextLink}
                href="/#highlights"
              >
                Apps
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ fontSize: '0.95rem', fontWeight: 600 }}
                component={NextLink}
                href="/#pricing"
              >
                Services
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0, fontSize: '0.95rem', fontWeight: 600 }}
                component={NextLink}
                href="/#faq"
              >
                FAQ
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0, fontSize: '1rem', fontWeight: 600, ml: 1 }}
                component={NextLink}
                href="/blog/"
              >
                Blog
              </Button>
            </Box>

          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Email us
              </Typography>
              <Button color="primary" variant="text" size="small" component="a" href="mailto:zoho@protek.co.tz" sx={{ p: 0, minWidth: 0, justifyContent: 'flex-start' }}>
                zoho@protek.co.tz
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Call us
              </Typography>
              <Button color="primary" variant="text" size="small" component="a" href="https://call.whatsapp.com/voice/QoB0lhG8DI1YhNf4iFhGBh" target="_blank" rel="noopener noreferrer" sx={{ p: 0, minWidth: 0, justifyContent: 'flex-start' }}>
                +255 692 109 164
              </Button>
            </Box>
            <Button color="primary" variant="contained" size="small" component={NextLink} href="/contact">
              Contact Us
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem component={NextLink} href="/#features" onClick={toggleDrawer(false)}>
                  Process
                </MenuItem>
                <MenuItem component={NextLink} href="/#highlights" onClick={toggleDrawer(false)}>
                  Apps
                </MenuItem>
                <MenuItem component={NextLink} href="/#pricing" onClick={toggleDrawer(false)}>
                  Services
                </MenuItem>
                <MenuItem component={NextLink} href="/#faq" onClick={toggleDrawer(false)}>
                  FAQ
                </MenuItem>
                <MenuItem component={NextLink} href="/contact" onClick={toggleDrawer(false)}>
                  Contact Us
                </MenuItem>
                <MenuItem component={NextLink} href="/blog/" onClick={toggleDrawer(false)}>
                  Blog
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem sx={{ display: 'block' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Email us
                  </Typography>
                  <Button color="primary" variant="text" size="small" component="a" href="mailto:zoho@protek.co.tz">
                    zoho@protek.co.tz
                  </Button>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mt: 1 }}>
                    Call us
                  </Typography>
                  <Button color="primary" variant="text" size="small" component="a" href="https://call.whatsapp.com/voice/QoB0lhG8DI1YhNf4iFhGBh" target="_blank" rel="noopener noreferrer">
                    +255 692 109 164
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
