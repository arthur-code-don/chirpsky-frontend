import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextField from '../../components/hook-form/RHFTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';




const MEMBERS = ["", "", ""]


// Create a reusable component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const TAGS_OPTION = [
  "Toy Story 3",
  "Logan",
  "Full Metal Jacket",
  "Dangal",
  "The Sting",
  "2001: A Space Odyssey",
  "Singin' in the Rain",
  "Toy Story",
  "Bicycle Thieves",
  "The Kid",
  "Inglourious Basterds",
  "Snatch",
  "3 Idiots",
];

const CreateGroupForm = ({handleClose}) => {
  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "Must have atleast 2 members"),

  });

  const defaultValues = {
    title: "",
    memebers: [],
    tags: [],
  }


  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;


  const onSubmit = async (data) => {
    try {
      // API CALL
      console.log("DATA", data);
    }
    catch (error) {
      console.log("error", error);
    }

  };

  return (

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

      <Stack spacing={3}>

        <RHFTextField name="title" label="Title" />
        <RHFAutocomplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={MEMBERS.map((option) => option)}
          ChipProps={{ size: "medium" }}
        />
        <Stack spacing={2} direction="row" alignItems={"center"} justifyContent="space-between">
        <Button onClick={handleClose} type="submit" variant="contained">
            Cancel 
          </Button>
          <Button onClick={handleSubmit} type="submit" variant="contained">
            Create 
          </Button>



        </Stack>

      </Stack>


    </FormProvider>
  );
};


const CreateGroup = ({ open, handleClose }) => {

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      {/* Title */}
      <DialogTitle sx={{mb: 2}}>Create New Group</DialogTitle>
      {/* Content */}
      <DialogContent>
        {/* Form */}
        <CreateGroupForm  handleClose={handleClose}/>
      </DialogContent>

    </Dialog>
  )
}

export default CreateGroup
