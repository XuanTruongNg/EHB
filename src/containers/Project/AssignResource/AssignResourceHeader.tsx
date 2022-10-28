import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { pageHeaderText } from "core/constant";

const AssignResourceHeader = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        px: "32px",
        height: "60px",
        borderBottom: "1px solid #C1C1C1",
      }}
    >
      <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
      <Typography sx={{ fontWeight: 600, fontSize: 20 }}>{pageHeaderText.ASSIGN_RESOURCES}</Typography>
    </Box>
  );
};

export default AssignResourceHeader;
