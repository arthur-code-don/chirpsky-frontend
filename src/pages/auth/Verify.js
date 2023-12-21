import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link } from "@mui/material";
import AuthSocial from "../../sections/settings/auth/AuthSocial";
import Login from "../../sections/settings/auth/LoginForm";
import VerifyForm from "../../sections/settings/auth/VerifyForm";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" color={"red"}>Please Verify OTP</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2" color={"#1DA1F2"}>
            Sent to email, This Verification Code expires in 10 minutes!
          </Typography>
        </Stack>
      </Stack>
      {/* Form */}
      <VerifyForm />
    </>
  );
}