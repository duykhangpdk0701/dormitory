import { IJobCreateParmas } from "@/pages/admin/job/create";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IStaffCreateParams } from "@/pages/admin/staff/create";
import { DatePicker } from "@mui/x-date-pickers";
import IJob from "@/interfaces/Job";

interface IStaffFormCreate {
  control: Control<IStaffCreateParams, any>;
  handleSubmit: UseFormHandleSubmit<IStaffCreateParams>;
  onSubmit: SubmitHandler<IStaffCreateParams>;
  isLoading: boolean;
  errorResMessage: string;
  job?: IJob[];
  isLoadingJob: boolean;
}

const StaffFormCreate: FC<IStaffFormCreate> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    errorResMessage,
    job,
    isLoadingJob,
  } = props;

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
                name="salary"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Lương"
                      type="number"
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
                name="job"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="roomt-type">Công việc</InputLabel>
                      <Select
                        {...field}
                        id="roomt-type"
                        fullWidth
                        error={invalid}
                        disabled={isLoadingJob}
                        label="Loại phòng"
                      >
                        {job?.map((item) => (
                          <MenuItem value={item._id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormHelperText error={invalid}>
                      {error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </Box>

            <Box className="mb-6">
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <DatePicker
                      {...field}
                      label="Ngày bắt đầu làm việc"
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
                name="email"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Địa chỉ Email"
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
                name="dateStart"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
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

export default StaffFormCreate;
