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
import { IViolationCreateParmas } from "@/pages/admin/violation/create";
import dynamic from "next/dynamic";
import ICivilian from "@/interfaces/Civilian";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IViolationFormCreate {
  control: Control<IViolationCreateParmas, any>;
  handleSubmit: UseFormHandleSubmit<IViolationCreateParmas>;
  onSubmit: SubmitHandler<IViolationCreateParmas>;
  isLoading: boolean;
  errorResMessage: string;
  civilian?: ICivilian[];
  isLoadingCivilian: boolean;
}

const ViolationFormCreate: FC<IViolationFormCreate> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    errorResMessage,
    civilian,
    isLoadingCivilian,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className="p-6">
            <Box className="mb-6">
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <TextField
                      error={invalid}
                      {...field}
                      label="Tên vi phạm"
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
                name="civilianId"
                control={control}
                render={({ field, fieldState: { error, invalid } }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="civilian-id">Cư dân</InputLabel>
                      <Select
                        {...field}
                        id="civilian-id"
                        fullWidth
                        error={invalid}
                        disabled={isLoadingCivilian}
                        label="Loại phòng"
                      >
                        {civilian?.map((item) => (
                          <MenuItem value={item._id}>
                            {`${item.account.lastname}
                             
                              ${item.account.firstname} - (${item.studentId})`}
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

export default ViolationFormCreate;
