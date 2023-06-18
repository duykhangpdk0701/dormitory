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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IEnrollServiceFormParams } from "@/pages/user/service/enroll/[id]";
import dynamic from "next/dynamic";
import IService from "@/interfaces/Service";
import priceFormat from "@/utils/formatPrice";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IServicFormEnroll {
  control: Control<IEnrollServiceFormParams, any>;
  handleSubmit: UseFormHandleSubmit<IEnrollServiceFormParams>;
  onSubmit: SubmitHandler<IEnrollServiceFormParams>;
  isLoading: boolean;
  errorResMessage: string;
  service?: IService;
  isLoadingService: boolean;
}

const ServiceFormEnroll: FC<IServicFormEnroll> = (props) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    errorResMessage,
    service,
    isLoadingService,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className="p-6">
            <Box className="mb-6">
              <Controller
                name="desc"
                control={control}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <FormLabel className="font-bold text-base block mb-3">
                      Mô tả:
                    </FormLabel>
                    <ReactQuill
                      {...field}
                      placeholder="Viết vài mô tả ghi chú khi đăng ký..."
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
              <div className="mb-4">
                <span className="font-bold text-base mr-2">Tên dịch vụ: </span>{" "}
                <span className="text-base">{service?.name} </span>
              </div>
              <div className="mb-4">
                <span className="font-bold text-base mr-2">Giá</span>{" "}
                <span className="text-base">
                  {service?.price && priceFormat(service?.price)}{" "}
                </span>
              </div>
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
            Đăng ký
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ServiceFormEnroll;
