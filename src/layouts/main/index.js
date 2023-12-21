import React from "react";
import { Container, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.png";
import FlyKite from "../../assets/Images/fly-kite.gif";
import backgroundCover from '../../assets/Images/phoenix-rising.mp4'; 
import { useSelector } from "react-redux";


const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if(isLoggedIn) {
    return <Navigate to="/app" />
  }
  return (
    <>

<div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100vh', // Adjust the height as needed
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={backgroundCover} type="video/mp4" />
        </video>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
      <Container sx={{ mt: 5 }} maxWidth="sm" >
        <Stack spacing={5}>
          <Stack sx={{ width: "100%" }} direction="column" alignItems={"center"}>
            <Stack   sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
            direction="row"
            alignItems={"center"}>
            <img style={{ height: 120, width: 120 }} src={Logo} alt="Logo" />
            <img style={{ height: 120, width: 120 }} src={FlyKite} alt="FlyKiteLogo" />
            </Stack>


          </Stack>



        </Stack>

        <Outlet />
      </Container>
      </div>
      </div>
    </>
  );
};

export default MainLayout;
