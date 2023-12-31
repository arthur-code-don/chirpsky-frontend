import { Box, Stack, Typography, Link, IconButton, Divider } from '@mui/material';
import React from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { MagnifyingGlass, Plus } from 'phosphor-react';
import {useTheme} from "@mui/material/styles";
import { SimpleBarStyle } from '../../components/Scrollbar';
import { ChatList } from '../../data';
import ChatElement from '../../components/ChatElement';
import CreateGroup from '../../sections/main/CreateGroup';

const Group = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  const handleOpenDialog = () => {
    setOpenDialog(true);
  }


  return (
    <>

      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            overflowY: "scroll",

            height: "100vh",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >

          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>

          <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >

              <Typography variant="h5">
                Groups
              </Typography>

            </Stack>

            <Stack sx={{ width: "100%" }}>

              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#8a0303" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Soul Search..." inputProps={{ "aria-label": "search" }} />
              </Search>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems={"center"}>
              <Typography variant="subtitle2" component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{flexGrow: 1, overflow: "scroll", height: "100%"}}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.5}>
                  {/* */}
                  <Typography variant="subtitle2" sx={{color: "#8a0303"}}>
                      Pinned
                  </Typography>
                  {/* Chat List */}
                  {ChatList.filter((el) => el.pinned).map((el, idx) => {
              return <ChatElement {...el} />
            })}


              {/* */}
              <Typography variant="subtitle2" sx={{color: "#8a0303"}}>
                      All Groups
                  </Typography>
                  {/* Chat List */}
                  {ChatList.filter((el) => !el.pinned).map((el, idx) => {
              return <ChatElement {...el} />
            })}
                </Stack>
              


              </SimpleBarStyle>



            </Stack>


          </Stack>



        </Box>
        {/* Right */}
        {/* Reuse Conversation Components */}
      </Stack>

      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog}/>}




    </>
  )
}

export default Group
