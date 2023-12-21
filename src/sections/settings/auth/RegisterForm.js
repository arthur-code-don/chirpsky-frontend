import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import FormProvider from '../../../components/hook-form/FormProvider';
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import RHFTextField from '../../../components/hook-form/RHFTextField';
import { Eye, SmileyXEyes } from 'phosphor-react';
import { RegisterUser } from '../../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
    .required("First Name is required")
    .min(2)
    .max(17),
    lastName: Yup.string()
    .required("Last Name is required")
    .min(2)
    .max(17),
    email: Yup.string()
      .required("Email is required")
      .email("email must be a valid email address")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: Yup.string()
      .required("Password is required")
      .min(8),
  });


  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",

  }

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: {errors},
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend 
      dispatch(RegisterUser(data));
    }
    catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
        {!!errors.afterSubmit && ( 
        
        <Alert severity="error">{errors.afterSubmit.message}</Alert>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <RHFTextField name="firstName" label="First Name"/>
        <RHFTextField name="lastName" label="Last Name"/>
      </Stack>
 
        <RHFTextField name="email" label="Email"/>
        <RHFTextField name="password" label="Password" type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => {
                  setShowPassword(!showPassword);
                }}>

                  {showPassword ? <Eye /> : <SmileyXEyes />}
                </IconButton>
              </InputAdornment>
            ),
          }}/> 

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
        Create Account

      </LoadingButton>
      


        </Stack>
        

        




      </FormProvider>

  )


}

export default RegisterForm
