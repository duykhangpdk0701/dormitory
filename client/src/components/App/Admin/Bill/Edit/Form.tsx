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
import { IBillCreateParmas } from "@/pages/admin/bill/create";
import IRoom from "@/interfaces/Room";
import ICivilian from "@/interfaces/Civilian";
import { IBillUpdateFormParmas } from "@/pages/admin/bill/[id]/edit";

interface IBillFormEdit {
  control: Control<IBillUpdateFormParmas, any>;
  handleSubmit: UseFormHandleSubmit<IBillUpdateFormParmas>;
  onSubmit: SubmitHandler<IBillUpdateFormParmas>;
  isLoading: boolean;
  errorResMessage: string;
  roomList?: IRoom[];
  isLoadingRoomList: boolean;
  civilianList?: ICivilian[];
  isLoadingCivilian?: boolean;
}

const BillFormEdit: FC<IBillFormEdit> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    errorResMessage,
    roomList,
    isLoadingRoomList,
    civilianList,
    isLoadingCivilian,
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
                        disabled={isLoadingRoomList}
                        label="Phòng"
                      >
                        {roomList?.map((item) => (
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
                name="civilianId"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="civilian">Cư dân</InputLabel>
                      <Select
                        {...field}
                        id="civilian"
                        fullWidth
                        error={invalid}
                        disabled={isLoadingCivilian}
                        label="Cư dân"
                      >
                        {civilianList?.map((item) => (
                          <MenuItem value={item._id}>
                            {item.account.firstname}
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
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-6">
            <Box className="mb-6">
              <Controller
                name="totalPrice"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Tổng tiền"
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

export default BillFormEdit;
