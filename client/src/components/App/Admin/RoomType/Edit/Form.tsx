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
  FormLabel,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IRoomTypeEditFormParams } from "@/pages/admin/room-type/[id]/edit";
import Dropzone from "@/components/Dropzone";

interface IRoomTypeFormEdit {
  control: Control<IRoomTypeEditFormParams, any>;
  handleSubmit: UseFormHandleSubmit<IRoomTypeEditFormParams>;
  onSubmit: SubmitHandler<IRoomTypeEditFormParams>;
  isLoading: boolean;
  errorResMessage: string;
}

const RoomTypeEditForm: FC<IRoomTypeFormEdit> = (props) => {
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
            Cập nhật
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default RoomTypeEditForm;
