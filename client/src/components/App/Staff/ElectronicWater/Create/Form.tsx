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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IEnrollServiceFormParams } from "@/pages/user/service/enroll/[id]";
import dynamic from "next/dynamic";
import IService from "@/interfaces/Service";
import priceFormat from "@/utils/formatPrice";
import IRoom from "@/interfaces/Room";
import { IElectronicWaterCreateParams } from "@/pages/staff/electronic-water/create";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IElectronicWaterCreateForm {
  control: Control<IElectronicWaterCreateParams, any>;
  handleSubmit: UseFormHandleSubmit<IElectronicWaterCreateParams>;
  onSubmit: SubmitHandler<IElectronicWaterCreateParams>;
  isLoading: boolean;
  errorResMessage: string;
  room?: IRoom[];
  isLoadingRoom: boolean;
}

const ElectronicWaterCreateForm: FC<IElectronicWaterCreateForm> = (props) => {
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
                name="roomId"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="roomt-type">Phòng</InputLabel>
                      <Select
                        {...field}
                        id="roomt-type"
                        fullWidth
                        error={invalid}
                        disabled={isLoadingRoom}
                        label="Phòng"
                      >
                        {room?.map((item) => (
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-6">
            <Box className="mb-3">
              <Controller
                name="numberStart"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Số bắt đầu"
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

            <Box>
              <Controller
                name="numberEnd"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Sô kết thúc"
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

export default ElectronicWaterCreateForm;
