import React, { FC } from "react";
import {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
  Controller,
} from "react-hook-form";
import { Grid, Paper, TextField, Box, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ICreateCivilianParams } from "@/pages/admin/civilian/create";
import { DatePicker } from "@mui/x-date-pickers";

interface ICivilianFormCreate {
  control: Control<ICreateCivilianParams, any>;
  handleSubmit: UseFormHandleSubmit<ICreateCivilianParams>;
  onSubmit: SubmitHandler<ICreateCivilianParams>;
  isLoading: boolean;
  errorResMessage: string;
}

const CivilianFormCreate: FC<ICivilianFormCreate> = (props) => {
  const { control, handleSubmit, onSubmit, isLoading, errorResMessage } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className="p-6">
            <Grid container spacing={3} className="mb-6">
              <Grid item xs={6}>
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <>
                      <TextField
                        error={invalid}
                        {...field}
                        label="Tên"
                        fullWidth
                      />
                      <FormHelperText error={invalid}>
                        {error?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field, fieldState: { invalid, error } }) => (
                    <>
                      <TextField
                        error={invalid}
                        {...field}
                        label="Họ"
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

            <Box className="mb-6">
              <Controller
                name="studentId"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Mã sinh viên"
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
                name="dateStart"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <DatePicker
                      {...field}
                      label="Ngày bắt đầu cư trú"
                      slotProps={{ textField: { fullWidth: true } }}
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
                name="dateOfBirth"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <DatePicker
                      {...field}
                      label="Ngày sinh"
                      slotProps={{ textField: { fullWidth: true } }}
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
                name="email"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Địa chỉ email"
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
                name="phone"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Số điện thoại"
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
                name="street"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Đường"
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
                name="district"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Quận"
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
                name="province"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Thành phố"
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
            Thêm
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CivilianFormCreate;
