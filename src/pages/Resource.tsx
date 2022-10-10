import PageHeader from 'components/PageHeader';
import { Button, Box } from '@mui/material';
import { useState } from 'react';
import AddResourceModal from 'containers/AddResourceModal';
import { HEADER_MARGIN } from 'core/constant/spacing';
import { buttonText, navBarText } from 'core/constant';

const Resource = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PageHeader title={navBarText.RESOURCES} height={60} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '32px',
          flex: 1,
          overflow: 'auto',
          height: `calc(100vh - ${HEADER_MARGIN}*2)`,
        }}
      >
        <Button
          size="medium"
          sx={{
            backgroundColor: 'secondary.main',
            ':hover': {
              backgroundColor: 'secondary.main',
              opacity: 0.8,
            },
          }}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {buttonText.ADD_RESOURCE}
        </Button>
      </Box>
      <AddResourceModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Resource;
