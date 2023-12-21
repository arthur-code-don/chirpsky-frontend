import React from 'react';
import { Link, Stack, Typography } from '@mui/material';
import {Link as RouterLink} from "react-router-dom";
import AuthSocial from '../../sections/settings/auth/AuthSocial';
import LoginForm from '../../sections/settings/auth/LoginForm';

const Login = () => {
  return (
    <>
    
    <Stack spacing={2} sx={{mb: 5, position: "relative"}}>
      <Typography variant="h4" color={"#8a0303"}>Login to Chirpsky Kite</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" color="whitesmoke">New User?</Typography>
        <Link to="/auth/register" component={RouterLink} variant="subtitle2" color={"#1DA1F2"}>
        Create an account
        </Link>
      </Stack>
      {/* Login Form */}
      <LoginForm />
      { /* Auth Social Methods */}
      <AuthSocial />



    </Stack>
    
    
    
    
    </>
  )
}

export default Login
