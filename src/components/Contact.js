import React from 'react';
import { 
  Avatar, 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Divider, 
  IconButton, 
  Slide, 
  Stack, 
  Typography } 
  from '@mui/material';
import { useTheme } from "@mui/material/styles";
import useResponsive from "../hooks/useResponsive";
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react';
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidebar, UpdateSiderbarType } from '../redux/slices/app';
// import { faker } from '@faker-js/faker';
import AntSwitch from "./AntSwitch";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Contact = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();
  const {current_conversation} = useSelector((state) => state.conversation.direct_chat);

  const [openBlock, setOpenBlock] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };



  const BlockDialog = ({open, handleClose}) => {
  
    return (

      <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this Contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this Contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
    );
  };


  const DeleteDialog = ({open, handleClose}) => {
  
    return (

      <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete this Chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this Chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
    )
  }




  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header  */}
        <Box sx={{
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          width: "100%",
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF"
            : theme.palette.background,
        }}>

          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            spacing={3}
            justifyContent="space-between" >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body  */}
        <Stack sx={{
          height: "100%",
          position: "relative",
          flexGrow: 1,
          overflowY: "scroll"
        }}
          p={3}
          spacing={3}
        >
          <Stack alignItems={"center"} direction="row" spacing={2}>
          <Avatar
              src={current_conversation?.img}
              alt={current_conversation?.name}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5} >
            <Typography variant="article" fontWeight={600}>
                {current_conversation?.name}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {/* {""} */}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row"
            alignItems={"center"}
            justifyContent="space-evenly"
          >
            <Stack spacing={1} alignItems="center">
              <IconButton>
                <Phone color='green' />
              </IconButton>
              <Typography variant="overline">
                Voice
              </Typography>
            </Stack>
            <Stack spacing={1} alignItems="center">
              <IconButton>
                <VideoCamera color='green' />
              </IconButton>
              <Typography variant="overline">
                Video
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant="article">Who Am I?</Typography>
            <Typography variant="body2" fontWeight={500}>
              {current_conversation?.about}
            </Typography>
            <Divider />
            <Stack direction="row" alignItems={"center"} justifyContent="space-between">
              <Typography variant="subtitle2">Media, Links, & Docs</Typography>
              <Button onClick={() => {
                dispatch(UpdateSiderbarType("SHARED"))
              }} endIcon={<CaretRight />}>
                {/* 612 */}
              </Button>

            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              {[1, 2, 3].map((el) => (
                <Box>
                  {/* <img src={} alt={""} /> */}
                </Box>
              ))}

            </Stack>

          </Stack>
          <Divider />
          <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Stack direction={"row"} alignItems="center" spacing={2}>
              <Star color='gold' filled size={21} />
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>
            <IconButton onClick={() => {
                dispatch(UpdateSiderbarType("STARRED"))
              }}>
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />
          <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Stack direction={"row"} alignItems="center" spacing={2}>
              <Bell color="#8a0303" size={21} />
              <Typography variant="subtitle2">Mute Notfications</Typography>
            </Stack>
            <AntSwitch />
          </Stack>
          <Divider />
          <Typography>1 Group in Common</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} /> */}
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Shark Tanks</Typography>
              <Typography variant="caption">Mr. Wonderful, Moguls, Ergo</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              onClick={() => {
                setOpenBlock(true);
              }}
              style={{ color: "red" }}
              startIcon={<Prohibit />} fullWidth variant="outlined">
              Block
            </Button>
            <Button
            onClick={() => {
              setOpenDelete(true);
            }}
              style={{ color: "#834333" }}
              startIcon={<Trash />} fullWidth variant="outlined">
              Delete
            </Button>

          </Stack>
        </Stack>
      </Stack>
      {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock} />}
      {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />}


    </Box>
  )
}

export default Contact
