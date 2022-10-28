import { Box, Button, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { notFoundPageText } from "core/constant";
import { buttonText } from "core/constant/button";
import { ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_PROJECT_MANAGER } from "core/constant/role";
import { useAppSelector } from "core/store";
import { selectUserRoleNames, selectUserStore } from "core/store/selector";

const NotFoundPage: FC = () => {
  const { user } = useAppSelector(selectUserStore);
  const userRoles = useAppSelector(selectUserRoleNames);
  const navigate = useNavigate();
  const navigateCheck = useCallback(() => {
    if (!user?.id) return navigate("/auth/login");
    if (userRoles?.includes(ROLE_ADMIN) || userRoles?.includes(ROLE_PROJECT_MANAGER))
      return navigate("/dashboard", { replace: true });
    if (userRoles?.includes(ROLE_EMPLOYEE)) return navigate("/time-sheet", { replace: true });
    return undefined;
  }, [navigate, user?.id, userRoles]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      rowGap="32px"
    >
      <Typography sx={{ fontSize: 96 }}>{notFoundPageText[404]}</Typography>
      <Typography sx={{ fontSize: 32 }}>{notFoundPageText.NOT_FOUND}</Typography>
      <Typography sx={{ fontWeight: 600 }}>{notFoundPageText.DESCRIPTION}</Typography>
      <Button variant="outlined" onClick={navigateCheck}>
        {buttonText.GO_HOME}
      </Button>
    </Box>
  );
};

export default NotFoundPage;
