import React, { FC } from "react";
import {
  Grid,
  Paper,
  TextField,
  Box,
  FormControlLabel,
  FormHelperText,
  Switch,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  Controller,
} from "react-hook-form";
import { ICreateRoomParams } from "@/pages/admin/room/add";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IRoomFormAdd {
  control: Control<ICreateRoomParams, any>;
  handleSubmit: UseFormHandleSubmit<ICreateRoomParams>;
  onSubmit: SubmitHandler<ICreateRoomParams>;

  isLoading: boolean;
  errorResMessage: string;
}

const RoomFormAdd: FC<IRoomFormAdd> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,

    isLoading,
    errorResMessage,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className="p-6">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { invalid, error } }) => (
                <>
                  <TextField error={invalid} {...field} label="Tên" fullWidth />
                  <FormHelperText error={invalid}>
                    {error?.message}
                  </FormHelperText>
                </>
              )}
            />
            <Box className="mt-6">
              <Typography variant="h6" className="mb-2">
                Mô tả
              </Typography>
              <ReactQuill placeholder="Viết vài mô tả về phòng..." />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-6">
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <>
                  <FormControlLabel
                    control={<Switch {...field} defaultChecked />}
                    label="Trạng thái"
                  />
                  <FormHelperText error={invalid}>
                    {error?.message}
                  </FormHelperText>
                </>
              )}
            />
            <Box className="mt-6">
              <Controller
                name="slug"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Slug"
                      fullWidth
                    />
                    <FormHelperText error={invalid}>
                      {error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </Box>
            <Box className="mt-6">
              <Controller
                name="order"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Order"
                      fullWidth
                    />
                    <FormHelperText error={invalid}>
                      {error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </Box>
          </Paper>
          <LoadingButton
            className="mt-6"
            fullWidth
            variant="contained"
            size="large"
            type="submit"
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default RoomFormAdd;
