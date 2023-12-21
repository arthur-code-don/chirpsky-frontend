import React from 'react'
import { Link, Stack, Typography } from '@mui/material';
import { CaretLeft } from 'phosphor-react';
import {Link as RouterLink} from "react-router-dom";
import NewPasswordForm from '../../sections/settings/auth/NewPasswordForm';

const NewPassword = () => {
  return (

    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography color="whitesmoke" variant="h3" pararaph>
          Reset Password
        </Typography>

        <Typography variant="body2" sx={{ color: "#8a0303", mb: 5, fontSize: "1.5rem", fontWeight: 600 }}>
          Please set your new password
        </Typography>



      </Stack>

      {/* NewPasswordForm */}
      <NewPasswordForm />
      

      <Link
          component={RouterLink}
          to="/auth/login"
          color="#1DA1F2"
          variant="subtitle2"
          sx={{
            mt: 3,
            mx: "auto",
            alignItems: "center",
            display: "inline-flex"
          }}
        >
            <CaretLeft />
            Return to Sign in
        </Link>


    </>
  );
};

export default NewPassword;
