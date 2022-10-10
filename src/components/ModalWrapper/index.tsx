import { Dialog } from '@mui/material';
import PageHeader from 'components/PageHeader';
import { CustomFC } from 'core/interface/component';
import { HEADER_MARGIN } from 'core/constant/spacing';

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
      <PageHeader height={HEADER_MARGIN} title={title} />
      {children}
    </Dialog>
  );
};

export default ModalWrapper;
