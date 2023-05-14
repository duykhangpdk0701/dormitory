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
import { DatePicker } from "@mui/x-date-pickers";
import IRoom from "@/interfaces/Room";
import dynamic from "next/dynamic";
import { IDeviceEditFormParams } from "@/pages/admin/device/[id]/edit";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IDeviceFormEdit {
  control: Control<IDeviceEditFormParams, any>;
  handleSubmit: UseFormHandleSubmit<IDeviceEditFormParams>;
  onSubmit: SubmitHandler<IDeviceEditFormParams>;
  isLoading: boolean;
  errorResMessage: string;
  room?: IRoom[];
  isLoadingRoom: boolean;
}

const DeviceFormEdit: FC<IDeviceFormEdit> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    errorResMessage,
    room,
    isLoadingRoom,
  } = props;

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
                      label="Tên thiết bị"
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

            <Box>
              <Controller
                name="desc"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-6">
            <Box className="mb-6">
              <Controller
                name="roomId"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="room">Phòng</InputLabel>
                      <Select
                        {...field}
                        id="room"
                        fullWidth
                        error={invalid}
                        disabled={isLoadingRoom}
                        label="Thuộc phòng"
                      >
                        {room?.map((item) => (
                          <MenuItem value={item._id} key={item._id}>
                            {item.name}
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
                name="dateAdd"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error, invalid },
                }) => (
                  <>
                    <DatePicker
                      value={value}
                      onChange={(newValue) => onChange(newValue)}
                      label="Ngày thêm"
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                    <FormHelperText error={invalid}>
                      {error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </Box>
            <Box>
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

export default DeviceFormEdit;
