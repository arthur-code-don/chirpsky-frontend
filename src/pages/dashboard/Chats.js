import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from "@mui/material/styles";
import { ArchiveBox, MagnifyingGlass, Planet, Users } from 'phosphor-react';
import { ChatList } from '../../data';
import { SimpleBarStyle } from '../../components/Scrollbar';
import useResponsive from "../../hooks/useResponsive";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search";
import ChatElement from '../../components/ChatElement';
import BottomNav from "../../layouts/dashboard/BottomNav";
import Friends from '../../sections/main/Friends';
import { socket } from '../../socket';
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversation";

const user_id = window.localStorage.getItem("user_id");



const Chats = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const isDesktop = useResponsive("up", "md");
  const theme = useTheme();

  const handleClick = () => {
    // Replace 'https://example.com' with the URL you want to redirect to
    window.location.href = 'https://chirpsky.net';
  };

  const { conversations } = useSelector((state) => state.conversation.direct_chat);



  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      console.log(data);
      // data => list of conversations
      dispatch(FetchDirectConversations({ conversations: data }));

    });
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };







  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: isDesktop ? 320 : "100vw",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        {!isDesktop && (
          // Bottom Nav
          <BottomNav />
        )}

        <Stack p={3} spacing={2} sx={{ height: "100vh", }} >
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant='h5'>
              Chats
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => {
                handleOpenDialog();
              }}>
                <Users size={32} color="#8a0303" />
              </IconButton>
              <a href="https://chirpsky.net" target='_blank' onClick={handleClick} style={{ textDecoration: 'none' }}>
                <IconButton>
                  <Planet size={32} color="#8a0303" />
                </IconButton>
              </a>
            </Stack>

          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#8a0303" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Soul Search..." inputProps={{ "aria-label": "search" }} />
            </Search>

          </Stack>
          <Stack spacing={1}>
            <Stack direction="row" alignItems={"center"} spacing={1.5}>
              <ArchiveBox color="#8a0303" size={24} />
              <Button sx={{ color: "#1DA1F2" }}>Archive</Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack
            spacing={2}
            direction="column"
            sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
          >
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              <Stack spacing={2.4}>
                {/* <Typography variant="subtitle2" sx={{ color: "#8a0303" }}>
                  Pinned
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />
                })} */}
              </Stack>
              <Stack mt={2}>
                <Stack spacing={2.4} >
                  <Typography variant="subtitle2"
                    sx={{ color: "#8a0303" }}>
                    All Chats
                  </Typography>
                  {conversations.filter((el) => !el.pinned).map((el) => {
                    return <ChatElement {...el} />;
                  })}

                </Stack>
              </Stack>
            </SimpleBarStyle>


          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}

    </>
  );
};

export default Chats;
