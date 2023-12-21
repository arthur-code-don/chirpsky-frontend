import React, { useState } from 'react'
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { Eye, SmileyXEyes } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { NewPassword } from '../../../redux/slices/auth';

const NewPasswordForm = () => {
  const dispatch = useDispatch();
  const [queryParameters] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8),
    confirmPassword: Yup.string()
      .required("Password is required")
      .min(8).oneOf([Yup.ref('password'), null], 'Password must match'),
  });


  const defaultValues = {
    password: "",
    confirmPassword: "",

  }

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
    //   Send API Request
    dispatch(NewPassword({...data, token: queryParameters.get('token')}));
    } catch (error) {
      console.error(error);
      reset();
        setError("aterSubmit", {
          ...error,
          message: error.message,
      });
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >


      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}


        <RHFTextField name="password" label="New Password" type={showPassword ? "text" : "password"}
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
          }}
        />
        <RHFTextField name="confirmPassword" label="Confirm Password" type={showPassword ? "text" : "password"}
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
          }}
        />



        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.palette.mode === "light" ? "skyblue" : "#8a0303",
            color: (theme) => theme.palette.mode === "light" ? "#000" : "skyblue",
            '&:hover': {
              color: "whitesmoke"
            }

          }} >
          Submit

        </Button>

      </Stack>



    </FormProvider>
  );
};

export default NewPasswordForm;
