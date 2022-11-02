import { Box, Button, Popover, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationItem } from "core/interface/navigation";
import { useAppDispatch, useAppSelector } from "core/store";
import { selectUserRoleNames } from "core/store/selector";
import { clearAuthKeyFromLocalStorage } from "../../util";
import { buttonText } from "../constant";
import { userActions } from "../store/slice";

interface Props {
  navigationItems: NavigationItem[];
}

const NavBar: FC<Props> = ({ navigationItems }) => {
  const navigate = useNavigate();
  const router = useLocation();
  const dispatch = useAppDispatch();
  const userRoles = useAppSelector(selectUserRoleNames);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: "32px",
        width: "100%",
        height: 60,
        backgroundColor: "primary.main",
      }}
    >
      <Box sx={{ display: "flex", columnGap: "64px" }}>
        {navigationItems
          .filter((item) => item.acceptRoles.some((acceptRole) => userRoles?.includes(acceptRole)))
          .map((item) => {
            const isSelected = router.pathname.includes(item.path);
            return (
              <Typography
                key={item.text}
                sx={{
                  color: isSelected ? "pink" : "common.white",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.text}
              </Typography>
            );
          })}
      </Box>
      <>
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "pink",
            fontWeight: 600,
            cursor: "pointer",
            ":hover": {
              backgroundColor: "pink",
              opacity: 0.6,
            },
          }}
          onClick={handleClick}
        >
          <Typography>N</Typography>
        </Button>
        <Popover
          id={id}
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            top: "8px",
          }}
        >
          <Typography
            sx={{
              cursor: "pointer",
              ":hover": {
                backgroundColor: "secondary.main",
                opacity: 0.8,
              },
              backgroundColor: "#35CA4D",
              color: "white",
              padding: "8px",
            }}
            onClick={() => {
              clearAuthKeyFromLocalStorage();
              dispatch(userActions.setToken(null));
            }}
          >
            {buttonText.LOGOUT}
          </Typography>
        </Popover>
      </>
    </Box>
  );
};

export default NavBar;
