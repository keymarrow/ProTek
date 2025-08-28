import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const metadata = {
  robots: {
    index: false,
    follow: true
  }
}


export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="faq"
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
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1d-header">
            <Typography component="span" variant="subtitle2">
              What is the approximate duration of the service?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              The duration of the setup/service varies based on your business requirements and the extent of work to be done from our end. However, you'll be informed of the expected duration of the service in the statement of work document.
              <br /><br />
              <strong>Note:</strong> Plans start with a minimum of 10 hours of service.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2d-header">
            <Typography component="span" variant="subtitle2">
              What is included in our service?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" component="div">
              Our service includes:
              <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                <li>A thorough consultation to understand your requirements.</li>
                <li>Preparation of a scope of work document, user guides, and a post-implementation document.</li>
                <li>Customization of product functions.</li>
                <li>Integration of third-party tools.</li>
                <li>Comprehensive training for your staff.</li>
                <li>Seven days of support post-implementation.</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3d-header">
            <Typography component="span" variant="subtitle2">
              Will I be provided any training on how to use the software?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Of course! You and your team will receive exclusive training to master all the configurations and customizations in your software.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel4d-header">
            <Typography component="span" variant="subtitle2">
              Who will support us after the project handover stage?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              We'll direct the respective product's technical support team to assist you with your product-related queries.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
