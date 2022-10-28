import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECT } from "core/constant";

interface Props {
  children: ReactNode;
}

const EditProjectHeader: FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "32px",
        px: "20px",
        height: 60,
        borderBottom: "1px solid #C1C1C1",
      }}
    >
      <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={() => navigate(PROJECT)} />
      {children}
    </Box>
  );
};

export default EditProjectHeader;
