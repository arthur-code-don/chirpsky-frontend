import React, { useEffect, useState } from "react";
import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { MagnifyingGlass, Phone, Plus } from 'phosphor-react';
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from '../../components/Scrollbar';
import { CallHistoryElement } from '../../components/CallElement';
import { CallHistory } from '../../data';
import StartCall from '../../sections/main/StartCall';
import { useDispatch, useSelector } from "react-redux";
import { FetchCallLogs } from "../../redux/slices/app";
const Call = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchCallLogs());
  }, []);
  const { call_logs } = useSelector((state) => state.app);
  const [openDialog, setOpenDialog] = useState(false);
 
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (

    <>

      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box sx={{
          height: "100vh",
          overflowY: "scroll",
          backgroundColor: (theme) => theme.palette.mode === "light" ?
            "#F8FAFF" : theme.palette.background,
          width: 320,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"

        }}
        >

          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>

          <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >

              <Typography variant="h5">
                Call History
              </Typography>

            </Stack>

            <Stack sx={{ width: "100%" }}>

              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#8a0303" />
                </SearchIconWrapper>
                <StyledInputBase multiline placeholder="Soul Search..." inputProps={{ "aria-label": "search" }} />
              </Search>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems={"center"}>
            <Typography variant="subtitle2" sx={{}} component={Link}>
                Start a conversation
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.5}>
                  {/* */}
                  
                  {/* Call History */}
                  {CallHistory.map((el, idx) => 
                    <CallHistoryElement  key={idx} {...el}/>
                  )}


                </Stack>



              </SimpleBarStyle>



            </Stack>


          </Stack>



        </Box>
        {/* Right */}
        {/* Reuse Conversation Components */}
      </Stack>
      {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog}/>}


    </>
  )
};

export default Call;
