import React from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../components/hook-form/FormProvider'
import { Alert, Stack } from '@mui/material';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from '../../../redux/slices/auth';
import { LoadingButton } from "@mui/lab";

const ResetPasswordForm = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("email must be a valid email address"),

  });


  const defaultValues = {
    email: "",

  }

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
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
      dispatch(ForgotPassword(data));
      reset();
    } catch (error) {
      console.error(error);
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
        <RHFTextField sx={{ color: "red" }}name="email" label="Email address" />

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
          },

        }} >
        Send Request
      </LoadingButton>

      </Stack>

     

    </FormProvider>
  );
};

export default ResetPasswordForm;
