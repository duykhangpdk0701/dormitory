import React, { ChangeEvent, FC, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  Controller,
} from "react-hook-form";
import { IUpdateUserParams } from "@/pages/profile/edit";

interface IProfileEditForm {
  control: Control<IUpdateUserParams, any>;
  handleSubmit: UseFormHandleSubmit<IUpdateUserParams>;
  onSubmit: SubmitHandler<IUpdateUserParams>;
  errors: FieldErrors<IUpdateUserParams>;
  isLoading: boolean;
  errorResMessage: string;
  handleSelectFile: (event: ChangeEvent<HTMLInputElement>) => void;
  file?: string;
}

const ProfileEditForm: FC<IProfileEditForm> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    errorResMessage,
    handleSelectFile,
    file,
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="py-20">
            <div>
              <Box
                className="flex justify-center items-center w-36 h-36 mx-auto rounded-full relative"
                sx={{ border: "1px dashed rgba(145, 158, 171, 0.32)" }}
                component="label"
                htmlFor="file-upload"
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  tabIndex={-1}
                  onChange={handleSelectFile}
                  accept="image/jpg,.gif,.png,.jpeg"
                />
                <span className="overflow-hidden w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full z-[8] absolute">
                  <LazyLoadImage src={file} />
                </span>
                <div
                  className="w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full z-[9] absolute flex flex-col justify-center items-center transition-opacity"
                  style={{
                    backgroundColor: "rgba(22, 28, 36, 0.64)",
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <AddAPhotoIcon className="mb-2 text-white" />
                  <Typography variant="caption" color="white">
                    Update Photo
                  </Typography>
                </div>
                <div
                  className="w-full h-full rounded-full z-20 absolute opacity-0 cursor-pointer"
                  onMouseEnter={() => setIsVisible(true)}
                  onMouseOut={() => setIsVisible(false)}
                ></div>
              </Box>
              <Typography variant="caption" className="block text-center mt-4">
                Cho phép *.jpeg, *.jpg, *.png, *.gif
                <br /> kích thước tối đa 3.1 MB
              </Typography>
            </div>
            <div className="flex justify-center">
              <FormControlLabel
                className="mt-10"
                value="start"
                label="Active"
                control={<Switch />}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className="p-6">
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field, fieldState: { error, invalid } }) => (
                    <>
                      <TextField
                        error={invalid}
                        {...field}
                        label="First Name"
                        fullWidth
                      />
                      <FormHelperText error={invalid}>
                        {error?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field, fieldState: { error, invalid } }) => (
                    <>
                      <TextField
                        error={invalid}
                        {...field}
                        label="Last Name"
                        fullWidth
                      />
                      <FormHelperText error={invalid}>
                        {error?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState: { error, invalid } }) => (
                    <>
                      <TextField
                        error={invalid}
                        {...field}
                        label="Email"
                        fullWidth
                      />
                      <FormHelperText error={invalid}>
                        {error?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <>
                      <TextField
                        error={invalid}
                        {...field}
                        label="Phone Number"
                        fullWidth
                      />
                      <FormHelperText error={invalid}>
                        {error?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <>
                      <TextField
                        error={invalid}
                        {...field}
                        label="Role"
                        fullWidth
                      />
                      <FormHelperText error={invalid}>
                        {error?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
            </Grid>
            <div className="flex justify-end">
              <Button
                className="mt-6"
                disableElevation
                type="submit"
                variant="contained"
              >
                Lưu thay đổi
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileEditForm;
