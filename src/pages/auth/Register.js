import React from 'react'
import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from '../../sections/settings/auth/RegisterForm';
import AuthSocial from '../../sections/settings/auth/AuthSocial';

const Register = () => {
  return (
    <>

      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" color={"#8a0303"}>
          Take Flight, with Chirpsky Kite
        </Typography>

        <Stack direction={"row"} spacing={0.5}>
          <Typography color={"whitesmoke"} variant="body2">Already have an account?</Typography>
          <Link component={RouterLink} to="/auth/login" variant="subtitle2" color={"#1DA1F2"}>
            Sign in
          </Link>
        </Stack>
        {/* Register Form */}
        <RegisterForm />
        <Typography
          component={"div"}
          sx={{
            color: "text.secondary",
            mt: 3,
            typography: "caption"
          }}
          textAlign="center"
        >
          {"By signing up, I agree to "}
          <Link underline="always" color="#8a0303">
            Terms of Service
          </Link>
          {" and "}
          <Link underline="always" color="#8a0303">
            Privacy Policy
          </Link>


        </Typography>
        <AuthSocial />

      </Stack>
     
      


    </>
  );
};

export default Register;
