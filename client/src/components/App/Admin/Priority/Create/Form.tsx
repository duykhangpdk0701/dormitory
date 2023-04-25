import { ICreatePriorityParams } from "@/pages/admin/priority/create";
import React, { FC } from "react";
import {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
  Controller,
} from "react-hook-form";

import {
  Grid,
  Paper,
  TextField,
  Box,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

interface IPriorityFormAdd {
  control: Control<ICreatePriorityParams, any>;
  handleSubmit: UseFormHandleSubmit<ICreatePriorityParams>;
  onSubmit: SubmitHandler<ICreatePriorityParams>;

  isLoading: boolean;
  errorResMessage: string;
}

const PriorityFormAdd: FC<IPriorityFormAdd> = (props) => {
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
                name="score"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Điểm"
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
      </Grid>{" "}
    </form>
  );
};

export default PriorityFormAdd;
