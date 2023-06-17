import React, { FC } from "react";
import {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
  Controller,
} from "react-hook-form";
import { Grid, Paper, TextField, Box, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IComplaintCreateFormParams } from "@/pages/user/complaint/create";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IComplaintFormCreate {
  control: Control<IComplaintCreateFormParams, any>;
  handleSubmit: UseFormHandleSubmit<IComplaintCreateFormParams>;
  onSubmit: SubmitHandler<IComplaintCreateFormParams>;
  isLoading: boolean;
  errorResMessage: string;
}

const ComplaintFormCreate: FC<IComplaintFormCreate> = (props) => {
  const { control, handleSubmit, onSubmit, isLoading, errorResMessage } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Paper className="p-6">
            <Box className="mb-6">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Tiêu đề"
                      fullWidth
                    />
                    <FormHelperText error={invalid}>
                      {error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </Box>
            <Box className="mb-6">
              <Controller
                name="desc"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <ReactQuill
                      {...field}
                      placeholder="Viết vài mô tả về phòng..."
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
            loading={isLoading}
          >
            Thêm
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ComplaintFormCreate;
