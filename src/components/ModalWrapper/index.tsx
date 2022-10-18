import { Box, Dialog } from '@mui/material';
import PageHeader from 'components/PageHeader';
import { CustomFC } from 'core/interface/component';
import { HEADER_MARGIN } from 'core/constant/spacing';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
}

const ModalWrapper: CustomFC<Props> = ({
  isOpen,
  setIsOpen,
  title,
  children,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '50%',
        },
      }}
      BackdropProps={{ sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } }}
    >
      <Box>
        <PageHeader height={HEADER_MARGIN} title={title} />
        <Box onClick={() => setIsOpen(false)}>
          <ClearIcon
            sx={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              cursor: 'pointer',
            }}
          />
        </Box>
      </Box>

      {children}
    </Dialog>
  );
};

export default ModalWrapper;
