import { ICreatePermissionParams } from "@/pages/admin/permission/create";
import React, { FC } from "react";
import {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
  Controller,
} from "react-hook-form";

import { Grid, Paper, TextField, Box, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface IPriorityFormAdd {
  control: Control<ICreatePermissionParams, any>;
  handleSubmit: UseFormHandleSubmit<ICreatePermissionParams>;
  onSubmit: SubmitHandler<ICreatePermissionParams>;

  isLoading: boolean;
  errorResMessage: string;
}

const PermissionForm: FC<IPriorityFormAdd> = (props) => {
  const { control, handleSubmit, onSubmit, isLoading, errorResMessage } = props;

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
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-6">
            <Box>
              <Controller
                name="desc"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Mô tả"
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
            loading={isLoading}
          >
            Tạo
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default PermissionForm;
