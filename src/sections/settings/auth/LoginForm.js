import React, { useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import FormProvider, { RHFTextField } from "../../../components/hook-form";
import { Eye, SmileyXEyes } from 'phosphor-react';
import { LoginUser } from '../../../redux/slices/auth';
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";


const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {isLoading} = useSelector((state) => state.auth);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8),
  });


  const defaultValues = {
    email: "",
    password: "",

  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: {
      errors,
      },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      // submit data to backend
      dispatch(LoginUser(data));
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >


      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="email" label="Email address" sx={{ color: "red" }}/>
        <RHFTextField name="password" label="Password" type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {
                  setShowPassword(!showPassword);
                }}>

                  {showPassword ? <Eye /> : <SmileyXEyes />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to="/auth/reset-password"
          variant="body2"
          color="#8a0303"
          underline="always">
          Forgot Password?
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{
          bgcolor: (theme) => theme.palette.mode === "light" ? "skyblue" : "#8a0303",
          color: (theme) => theme.palette.mode === "light" ? "#000" : "skyblue",
          '&:hover': {
            color: "whitesmoke"
          }

        }} >
        Sign In

      </LoadingButton>

    </FormProvider>
  );
};

export default LoginForm;
