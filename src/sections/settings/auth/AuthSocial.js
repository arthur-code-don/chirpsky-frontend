import React from 'react';
import { Box, Divider, IconButton, Stack } from '@mui/material'
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react';

const AuthSocial = () => {

  const handleGoogleLogin = async () => {

  };

  const handleGithubLogin = async () => {
    
  };

  const handleTwitterLogin = async () => {
    
  };

  return (
    <Box>

      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          '&::before, ::after': {
            borderTopStyle: "dashed",
          },
        }}>
        OR

      </Divider>
      <Stack direction={"row"} justifyContent="center" spacing={2}>
      <IconButton onClick={handleGoogleLogin}>
          <GoogleLogo color="#8a0303"></GoogleLogo>

        </IconButton>
        <IconButton sx={{color: "green"}} onClick={handleGithubLogin}>
          <GithubLogo ></GithubLogo>

        </IconButton>
        <IconButton onClick={handleTwitterLogin}>
          <TwitterLogo color="#1DA1F2"></TwitterLogo >

        </IconButton>


      </Stack>


    </Box>
  );
};

export default AuthSocial;
