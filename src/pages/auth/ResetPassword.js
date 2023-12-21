import React from 'react'
import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from 'phosphor-react';
import ResetPasswordForm from '../../sections/settings/auth/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <>

      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography color="whitesmoke" variant="h3" pararaph>
          Forgot Your Password?
        </Typography>
        <Typography variant="body2" sx={{ color: "#8a0303", mb: 5, fontSize: "1.5rem", fontWeight: 600 }}>
          Please enter the email address associated with your account and We will
          email you a link to reset your password.
        </Typography>
        {/*Reset Password Form */}
        <ResetPasswordForm />
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



      </Stack>


    </>
  )
}

export default ResetPassword;
