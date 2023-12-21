import { Box, IconButton, Stack, Typography } from '@mui/material';
import { CaretLeft } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import ProfileForm from '../../sections/settings/auth/ProfileForm';
import { useDispatch } from "react-redux";
import { FetchUserProfile } from "../../redux/slices/app";

const Profile = () => {
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(false);

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleOpenProfile = () => {
    setOpenProfile(true);
  };
  


  useEffect(() => {
    dispatch(FetchUserProfile());
  }, []);
  return (
    <>


      <Stack direction={"row"} sx={{ width: "100%" }}>

        <Box sx={{
          height: "100vh",
          overflowY: "scroll",
          backgroundColor: (theme) => theme.palette.mode === "light" ?
            "#F8FAFF" : theme.palette.background,
          width: 320,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"

        }}
        >



          <Stack p={4} spacing={5}>

            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={3}>
              <IconButton onClick={handleCloseProfile} >
                <CaretLeft size={24} color={"#8a0303"} />
              </IconButton>

              <Typography variant="h5">
                Profile
              </Typography>

            </Stack>
            {/* Profile Form */}
            <ProfileForm />
          </Stack>
        </Box>
        {/* Right Pane */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
          }}
        ></Box>



      </Stack>



    </>
  );
};

export default Profile;
