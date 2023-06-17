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
import { ITaskCreateParams } from "@/pages/admin/task/create";
import IStaff from "@/interfaces/Staff";
import { DatePicker } from "@mui/x-date-pickers";

interface ITaskFormCreate {
  control: Control<ITaskCreateParams, any>;
  handleSubmit: UseFormHandleSubmit<ITaskCreateParams>;
  onSubmit: SubmitHandler<ITaskCreateParams>;
  isLoading: boolean;
  errorResMessage: string;
  staff?: IStaff[];
  isLoadingStaff: boolean;
}

const TaskFormCreate: FC<ITaskFormCreate> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    errorResMessage,
    staff,
    isLoadingStaff,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className="p-6">
            <Box className="mb-6">
              <Controller
                name="staffId"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="staff">Nhân viên</InputLabel>
                      <Select
                        {...field}
                        id="staff"
                        fullWidth
                        error={invalid}
                        disabled={isLoadingStaff}
                        label="Nhân viên"
                      >
                        {staff?.map((item) => (
                          <MenuItem value={item._id} key={item._id}>
                            {item.account.lastname} {item.account.firstname}
                          </MenuItem>
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-6">
            <Box className="mb-6">
              <Controller
                name="dateAssign"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <DatePicker
                      {...field}
                      label="Ngày đăng ký"
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

export default TaskFormCreate;
