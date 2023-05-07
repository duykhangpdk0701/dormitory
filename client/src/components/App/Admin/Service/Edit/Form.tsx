import { IJobCreateParmas } from "@/pages/admin/job/create";
import React, { FC } from "react";
import {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
  Controller,
} from "react-hook-form";
import { Grid, Paper, TextField, Box, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IServiceEditParams } from "@/pages/admin/service/[id]/edit";

interface IServiceFormEdit {
  control: Control<IServiceEditParams, any>;
  handleSubmit: UseFormHandleSubmit<IServiceEditParams>;
  onSubmit: SubmitHandler<IServiceEditParams>;
  isLoading: boolean;
  errorResMessage: string;
}

const ServiceFormEdit: FC<IServiceFormEdit> = (props) => {
  const { control, handleSubmit, onSubmit, isLoading, errorResMessage } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
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
                      label="Tên"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
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
                    <TextField
                      error={invalid}
                      {...field}
                      label="Mô tả"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    <FormHelperText error={invalid}>
                      {error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-6">
            <Box className="mb-6">
              <Controller
                name="price"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Giá(VND)"
                      type="number"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
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

export default ServiceFormEdit;
