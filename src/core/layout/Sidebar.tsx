import { Box } from "@mui/material";
import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationItem } from "core/interface/navigation";
import { useAppSelector } from "core/store";
import { selectUserRoleNames } from "core/store/selector";

interface Props {
  navigationItems: NavigationItem[];
}

const Sidebar: FC<Props> = ({ navigationItems }) => {
  const navigate = useNavigate();
  const router = useLocation();
  const userRoles = useAppSelector(selectUserRoleNames);
  return (
    <>
      {navigationItems
        .filter((item) => item.acceptRoles.some((acceptRole) => userRoles?.includes(acceptRole)))
        .map((item) => {
          const isSelected = router.pathname === item.path;
          return (
            <Box
              key={item.text}
              sx={{
                width: 60,
                height: 60,
                fontSize: 36,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: isSelected ? "rgba(184, 205, 247, 0.35)" : "common.white",
                ":hover": {
                  backgroundColor: "rgba(184, 205, 247, 0.55)",
                },
              }}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
            </Box>
          );
        })}
    </>
  );
};

export default Sidebar;
