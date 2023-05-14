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
import { IContractCreateParmas } from "@/pages/admin/contract/create";
import IRoom from "@/interfaces/Room";
import IStaff from "@/interfaces/Staff";
import ICivilian from "@/interfaces/Civilian";

interface IContractFormCreate {
  control: Control<IContractCreateParmas, any>;
  handleSubmit: UseFormHandleSubmit<IContractCreateParmas>;
  onSubmit: SubmitHandler<IContractCreateParmas>;
  isLoading: boolean;
  errorResMessage: string;
  roomList?: IRoom[];
  isLoadingRoomList: boolean;
  staffList?: IStaff[];

  isLoadingStaffList: boolean;
  civilianList?: ICivilian[];

  isLoadingCivilianList: boolean;
}

const ContractFormCreate: FC<IContractFormCreate> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    errorResMessage,
    roomList,
    isLoadingRoomList,
    staffList,
    isLoadingStaffList,
    civilianList,
    isLoadingCivilianList,
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
                      <InputLabel id="roomt-type">Loại phòng</InputLabel>
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
                      <InputLabel id="roomt-type">Cư dân</InputLabel>
                      <Select
                        {...field}
                        id="roomt-type"
                        fullWidth
                        error={invalid}
                        disabled={isLoadingRoomList}
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

            <Box className="mb-6">
              <Controller
                name="staffId"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="roomt-type">Nhân viên</InputLabel>
                      <Select
                        {...field}
                        id="roomt-type"
                        fullWidth
                        error={invalid}
                        disabled={isLoadingStaffList}
                        label="Nhân viên"
                      >
                        {staffList?.map((item) => (
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
                      fullWidth
                      type="number"
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

export default ContractFormCreate;
