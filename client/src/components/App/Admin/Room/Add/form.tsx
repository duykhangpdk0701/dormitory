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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  FormLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
  Controller,
} from "react-hook-form";
import { ICreateRoomParams } from "@/pages/admin/room/create";
import dynamic from "next/dynamic";
import IRoomType from "@/interfaces/RoomTypet";
import Dropzone from "@/components/Dropzone";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IRoomFormAdd {
  control: Control<ICreateRoomParams, any>;
  handleSubmit: UseFormHandleSubmit<ICreateRoomParams>;
  onSubmit: SubmitHandler<ICreateRoomParams>;
  isLoading: boolean;
  errorResMessage: string;
  roomTypes?: IRoomType[];
  isLoadingRoomTypes: boolean;
}

const RoomFormAdd: FC<IRoomFormAdd> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,

    isLoading,
    errorResMessage,
    roomTypes,
    isLoadingRoomTypes,
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
              <Controller
                name="roomType"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="roomt-type">Loại phòng</InputLabel>
                      <Select
                        {...field}
                        id="roomt-type"
                        fullWidth
                        error={invalid}
                        disabled={isLoadingRoomTypes}
                        label="Loại phòng"
                      >
                        {roomTypes?.map((item) => (
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

            <Box className="mt-6">
              <Typography variant="h6" className="mb-2">
                Mô tả
              </Typography>
              <Controller
                name="description"
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

            <Box>
              <Controller
                name="images"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { invalid, error },
                }) => (
                  <>
                    <FormLabel className="font-bold text-base mb-4 block">
                      Hình ảnh:
                    </FormLabel>
                    <Dropzone
                      onChange={onChange}
                      multiple={true}
                      error={invalid}
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
                name="numberOfPeople"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Sức chứa (Người)"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Người
                          </InputAdornment>
                        ),
                      }}
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
                name="numberBed"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Sức chứa (Giường)"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Giường
                          </InputAdornment>
                        ),
                      }}
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
                name="area"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Diện tích"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            m<sup>2</sup>
                          </InputAdornment>
                        ),
                      }}
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
                name="length"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Chiều dài"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            m<sup>2</sup>
                          </InputAdornment>
                        ),
                      }}
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
                name="width"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Chiều Rộng"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            m<sup>2</sup>
                          </InputAdornment>
                        ),
                      }}
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
                name="price"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Giá"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">VND</InputAdornment>
                        ),
                      }}
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
                name="floor"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Tầng"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Tầng</InputAdornment>
                        ),
                      }}
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
            Tạo Phòng
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default RoomFormAdd;
