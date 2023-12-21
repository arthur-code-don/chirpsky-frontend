import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack
} from '@mui/material';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { MagnifyingGlass } from 'phosphor-react';
import { CallElement } from '../../components/CallElement';
import { CallHistory } from "../../data";
import { FetchAllUsers } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { MembersList } from '../../data';
import {faker} from "@faker-js/faker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const StartCall = ({ open, handleClose }) => {

  const {all_users} = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchAllUsers());
  }, []);

  console.log(CallHistory, all_users, "Call List Info");

  const list = all_users.map((el) => ({
    id: el?._id,
    name: `${el?.firstName} ${el?.lastName}`,
    image: faker.image.avatar(),
  }));

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {/* Title */}
      <DialogTitle sx={{ mb: 3 }}>Start Call</DialogTitle>
      {/* Content */}
      <DialogContent>
        {/* Form */}
        <Stack spacing={3}>
          <Stack sx={{ width: "100%" }}>

            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#8a0303" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Soul Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>
          {/* Call List */}
          {MembersList.map((el, idx) =>
             {
              return <CallElement key={idx} {...el} handleClose={handleClose} />;
            })}
        </Stack>



      </DialogContent>



    </Dialog>
  )
}

export default StartCall;
