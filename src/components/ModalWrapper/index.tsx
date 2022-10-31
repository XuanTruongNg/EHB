import ClearIcon from "@mui/icons-material/Clear";
import { Box, Dialog } from "@mui/material";
import { FC, ReactNode } from "react";
import PageHeader from "components/PageHeader";
import { HEADER_MARGIN } from "core/constant/spacing";

interface Props {
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
  title: string;
  children: ReactNode;
}

const ModalWrapper: FC<Props> = ({ isOpen, setIsOpen, title, children }) => (
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    PaperProps={{
      sx: {
        width: "100%",
        maxWidth: "50%",
      },
    }}
    BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" } }}
  >
    <Box>
      <PageHeader height={HEADER_MARGIN} title={title} />
      <Box onClick={() => setIsOpen(false)}>
        <ClearIcon
          sx={{
            position: "absolute",
            top: "16px",
            right: "16px",
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>

    {children}
  </Dialog>
);

export default ModalWrapper;
