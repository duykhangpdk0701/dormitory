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
  FormLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IRoomTypeCreateParams } from "@/pages/admin/room-type/create";
import Dropzone from "@/components/Dropzone";

interface IRoomTypeFormCreate {
  control: Control<IRoomTypeCreateParams, any>;
  handleSubmit: UseFormHandleSubmit<IRoomTypeCreateParams>;
  onSubmit: SubmitHandler<IRoomTypeCreateParams>;
  isLoading: boolean;
  errorResMessage: string;
}

const RoomTypeCreateForm: FC<IRoomTypeFormCreate> = (props) => {
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
            <Box className="mb-6">
              <Controller
                name="price"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Giá"
                      type="number"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
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

export default RoomTypeCreateForm;
