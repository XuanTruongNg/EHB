import { Box } from "@mui/system";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const EditProjectHeader: FC<Props> = ({ children }) =>
  (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "32px",
        px: "20px",
        height: 60,
        borderBottom: "1px solid #C1C1C1"
      }}
    >
      {children}
    </Box>
  );

export default EditProjectHeader;
