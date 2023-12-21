import React, { useCallback, useState } from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../components/hook-form/FormProvider'
import { Alert, InputAdornment, Stack, Typography } from '@mui/material';
import {RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile } from "../../../redux/slices/app";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);


  const LoginSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(24),
    about: Yup.string()
      .required("About is required")
      .max(187),
    avatarUrl: Yup.string()
      .required("Avatar is required")
      .nullable(true),


  });


  const defaultValues = {
    name: "",
    about: "",
    avatar: "",

  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful },
  } = methods;


  const values = watch();

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    setFile(file);

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file)
    })

    if (file) {
      setValue("avatarUrl", newFile, { shouldValidate: true });
    }

  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      // submit data to backend 
      console.log("Data", data);
      dispatch(
        UpdateUserProfile({
          name: data?.name,
          about: data?.about,
          avatar: file,
        })
      );
    }
    catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      })
    }
  };


  const nameCharacterLimit = 24;
  const aboutCharacterLimit = 187;
  const remainingNameCharacters = nameCharacterLimit - values.name.length;
  const remainingCharacters = aboutCharacterLimit - values.about.length;
  const isSaveButtonDisabled = values.about.length > aboutCharacterLimit || values.name.length > nameCharacterLimit;


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Stack spacing={3}>
      <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />

        <Stack spacing={3}>
          {!!errors.afterSubmit &&
            <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <RHFTextField
            name="name"
            label="Name"
            helperText={"This Name is Visible to your contacts"}
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="bottom">
                 
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" justifyContent={"end"}>

          <Typography variant="caption" color={remainingNameCharacters >= 0 ? 'inherit' : 'error'}>
                    {remainingNameCharacters} Kharacters remaining
                  </Typography>
          </Stack>

          <RHFTextField
            multiline
            rows={4}
            maxRows={5}
            name="about"
            label="About"
            InputProps={{
              endAdornment: (
                <InputAdornment position="bottom">
                
                </InputAdornment>
                
              ),
              
            }}
            
            
          />
          <Stack direction="row" justifyContent={"end"}>
          
                    <Typography variant="caption" color={remainingCharacters >= 0 ? 'inherit' : 'error'}>
                      {remainingCharacters} Kharacters remaining
                    </Typography>
                  
          </Stack>
            


        </Stack>
        <Stack direction="row" justifyContent={"end"}>
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="outlined"
            disabled={isSaveButtonDisabled}
          >
            Save
          </LoadingButton>

        </Stack>

      </Stack>




    </FormProvider>
  );
};

export default ProfileForm;
