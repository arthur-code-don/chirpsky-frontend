import React from 'react'
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Badge,
  Stack,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { faker } from '@faker-js/faker';
import StyledBadge from './StyledBadge';
import { useDispatch } from "react-redux";
import { StartAudioCall } from "../redux/slices/audioCall";
import { StartVideoCall } from "../redux/slices/videoCall";
// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../config";
import { ArrowDownLeft, ArrowUpRight, Phone, VideoCamera } from 'phosphor-react';



const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));




const CallHistoryElement = ({ img, name, incoming, missed, online, id }) => {
  const theme = useTheme();

  return (
    <>

      <StyledChatBox sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "light" ? "#1DA1F2"
          : theme.palette.background.paper
      }}
        p={2}
      >

        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Stack spacing={2} direction="row" alignItems="center">



            {online ? <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
               <Avatar alt={name} src={`https://chirpskykite-server.onrender.com/${img}`} />
            </StyledBadge>
              : <Avatar alt={name} src={`https://chirpskykite-server.onrender.com/${img}`} />}

            <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>

              {/* <Typography
              variant="caption"
            >{msg}
            </Typography> */}
              <Stack direction={"row"} alignItems="center" spacing={1}>
                {incoming ? (
                  <ArrowDownLeft
                    color={missed ? "#8a0303" : "green"} />
                ) : (
                  <ArrowUpRight color={missed ? "#8a0303" : "green"} />
                )}
                <Typography variant="caption">
                  Yesterday 6:13
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <IconButton >
            <Phone color='green' />
          </IconButton>
          <IconButton >
            <VideoCamera color='green' />
          </IconButton>
        </Stack>
      </StyledChatBox>




    </>
  )
}


const CallElement = ({ img, name, id, handleClose, online }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

  return (

    <StyledChatBox sx={{
      width: "100%",
      borderRadius: 1,
      backgroundColor: theme.palette.mode === "light" ? "#1DA1F2"
        : theme.palette.background.paper
    }}
      p={2}
    >

      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack spacing={2} direction="row" alignItems="center">




          {online ? 
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
              <Avatar alt={name} src={img} />
          </StyledBadge>
            :  <Avatar alt={name} src={img} />}

          <Stack spacing={0.3}>
          <Typography variant="subtitle2">{name}</Typography>

            {/* <Typography
            variant="caption"
          >{msg}
          </Typography> */}
          </Stack>
        </Stack>
      <Stack direction="row" alignItems={"center"}>
      <IconButton
            onClick={() => {
              dispatch(StartAudioCall(id));
              handleClose();
            }}
          >
            <Phone style={{ color: theme.palette.primary.main }} />
          </IconButton>

          <IconButton
            onClick={() => {
              dispatch(StartVideoCall(id));
              handleClose();
            }}
          >
            <VideoCamera style={{ color: theme.palette.primary.main }} />
          </IconButton>
      </Stack>

      </Stack>
    </StyledChatBox>

  )

};

export { CallHistoryElement, CallElement };
