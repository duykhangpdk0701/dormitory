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
  FormLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IComplaintCreateFormParams } from "@/pages/user/complaint/create";
import dynamic from "next/dynamic";
import { IRequestChangeRoomFormPage } from "@/pages/user/request-change-room";
import IRoomType from "@/interfaces/RoomTypet";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IRequestChangeRoomFormCreate {
  control: Control<IRequestChangeRoomFormPage, any>;
  handleSubmit: UseFormHandleSubmit<IRequestChangeRoomFormPage>;
  onSubmit: SubmitHandler<IRequestChangeRoomFormPage>;
  isLoading: boolean;
  errorResMessage: string;
  roomTypes?: IRoomType[];
  isLoadingRoomTypes: boolean;
}

const RequestChangeRoomFormCreate: FC<IRequestChangeRoomFormCreate> = (
  props
) => {
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
            <Box className="mb-6">
              <Controller
                name="reason"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <FormLabel className="mb-3 block font-bold text-base">
                      Lý do:
                    </FormLabel>
                    <ReactQuill
                      {...field}
                      placeholder="Viết vài dòng về lý do..."
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

export default RequestChangeRoomFormCreate;
