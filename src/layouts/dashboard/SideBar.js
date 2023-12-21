import React, { useState } from 'react'
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { Nav_Buttons, Profile_Menu } from '../../data';
import { Gear } from 'phosphor-react';
import MaterialUISwitch from '../../components/MaterialUISwitch';
import { faker } from '@faker-js/faker';
import Logo from "../../assets/Images/logo.png";
import useSettings from '../../hooks/useSettings';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../../redux/slices/auth';
import { useDispatch, useSelector } from "react-redux";
import { UpdateTab } from "../../redux/slices/app";
import ProfileMenu from "./ProfileMenu";

const getNavigatePath = (index) => {
  switch (index) {
    case 0:
      return "/app";

    case 1:
      return "/group";

    case 2:
      return "/call";

    case 3:
      return "/settings";

    default:
      break;
  };

};




const getMenuPath = (idx) => {
  switch (idx) {
    case 0:
      return "/profile";

    case 1:
      return "/settings";

    case 2:

      return "/auth/login";



    default:
      break;
  }

}

const SideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { tab } = useSelector((state) => state.app);
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  const navigate = useNavigate();
  const selectedTab = tab;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleChangeTab = (index) => {
    dispatch(UpdateTab({ tab: index }));
    navigate(getMenuPath(index));
  };


  return (

    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        height: "100vh",
        width: 100
      }}

    >
      <Stack
        direction="column"
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ height: "100%" }}
        spacing={3}
      >
        <Stack alignItems={"center"} spacing={4}>

          <Box sx={{
            backgroundColor: "#8a0303",
            height: 64,
            width: 64,
            borderRadius: 1.5,
            opacity: .8,
          }}>
            <img src={Logo} alt={"Chirpsky Logo"} />

          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: "#8a0303",
                    borderRadius: 1.5
                  }}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#fff" }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(el.index);
                    navigate(getNavigatePath(el.index));
                  }}
                  sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#1DA1F2" : "green" }}
                  key={el.index}
                >
                  {el.icon}
                </IconButton>
              )
            )}
            <Divider width="45px" sx={{ backgroundColor: "red" }} />
            {selected === 3 ? (
              <Box
                p={1}
                sx={{
                  backgroundColor: "#8a0303",
                  borderRadius: 1.5
                }}
              >
                <IconButton sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#ffd700 " : "000" }}>
                  <Gear />
                </IconButton>
              </Box>
            ) : (<IconButton onClick={() => {
              setSelected(3);
              navigate(getNavigatePath(3));

            }}
              sx={{ width: "max-content", color: "#000" }}

            >
              <Gear />
            </IconButton>
            )}
          </Stack>
        </Stack>

        <Stack spacing={4}
          alignItems={"center"}>
          {/* Switch */}
          <MaterialUISwitch
            onChange={() => {
              onToggleMode();
            }}
            defaultChecked />
          <Avatar
            id="basic-button"
            src={faker.image.avatar()} alt="User Profile Img"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} size={20} />

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClick}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}

          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, idx) => (
                <MenuItem onClick={() => {
                  navigate(getMenuPath(idx));

                }}>


                  <Stack
                    onClick={() => {
                      if (idx === 2) {
                        // If idx is 2 then dispatch logout
                        dispatch(LogoutUser());
                      }
                      else {
                        navigate(getMenuPath(idx));
                      }



                    }}
                    sx={{
                      width: 100
                    }}
                    direction="row"
                    alignItems={"center"}
                    justifyContent="space-between">
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>{" "}
                </MenuItem>
              ))}
            </Stack>
          </Menu>

        </Stack>
      </Stack>


    </Box>
  )
}

export default SideBar;
