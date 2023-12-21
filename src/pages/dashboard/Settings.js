import React, { useState } from 'react';
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import Shortcuts from '../../sections/settings/Shortcuts';
import ThemeDialog from "../../sections/settings/ThemeDialog";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from 'react-redux';

const Settings = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);

  const theme = useTheme();
  const dispatch = useDispatch();


  const handleOpenTheme = () => {
    setOpenTheme(true);
  };

  const handleCloseTheme = () => {
    setOpenTheme(false);
  };


  const handleCloseSettings = () => {
    setOpenSettings(false);
  };
  
  const [openShortcuts, setOpenShortcuts] = useState(false);

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };

  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };


  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => { },
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => { },
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => { },
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      // onclick: handleOpenTheme,
      onclick: () => { },
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => { },
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => { },
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick: handleOpenShortcuts,
      // onclick: () => {},

    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => { },
    },
  ];







  return (
    <>

      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left Panel */}
        <Box
          sx={{
            overflowY: "scroll",
            height: "100vh",
            width: 320,
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF"
              : theme.palette.background,
            boxShadow: "0px, 0px, 2px, rgba(0, 0, 0, 0.25)",

          }}
        >

          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction="row" alignItems={"center"} spacing={3}>
              <IconButton onClick={handleCloseSettings}>
                <CaretLeft 
                  size={24} color={"#8a0303"} />
              </IconButton>
              <Typography variant="h6">Settings</Typography>

            </Stack>
            {/* Profile Section */}
            <Stack direction={"row"} spacing={3}>
              <Avatar sx={{ width: 56, height: 56 }}
                src={faker.image.avatar()}
                alt={faker.name.fullName()}
              />
              <Stack spacing={0.5}>
                <Typography variant="article">
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2">
                  {faker.address.city()}
                </Typography>


              </Stack>



            </Stack>
            {/* List of Options */}
            <Stack spacing={4}>
              {list.map(({ key, icon, title, onclick }) => <>
                <Stack spacing={2} sx={{ cursor: "pointer" }} onClick={onclick}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {icon}

                    <Typography variant="body2">{title}</Typography>
                  </Stack>
                  {key !== 7 && <Divider />}
                </Stack>


              </>)}
            </Stack>
          </Stack>
        </Box>

        {/* Right Panel */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
          }}
        ></Box>
      </Stack>
      {openTheme && (
        <ThemeDialog open={openTheme} handleClose={handleCloseTheme} />
      )}
      {openShortcuts && <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts} />}

    </>

  );
};

export default Settings;
