import adminBookingRequest from "@/api/admin/bookingRequest";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { useAppDispatch } from "@/hooks/redux";
import IBookingRequest from "@/interfaces/BookingRequest";
import { LoadingButton } from "@mui/lab";
import { Card, CardHeader, Divider, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, useCallback, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMutation } from "react-query";

interface IAwaitingStudentDetailContent {
  data?: IBookingRequest;
}

const AwaitingStudentDetailContent: FC<IAwaitingStudentDetailContent> = (
  props
) => {
  const { data } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAccept = async () => {
    if (data?._id) {
      await acceptRequestMutation.mutateAsync(data._id);
    }
  };

  const handleDeny = async () => {
    if (data?._id) {
      await denyRequestMutation.mutateAsync(data?._id);
    }
  };

  const acceptRequestMutation = useMutation({
    mutationKey: ["awaiting-student-request"],
    mutationFn: (id: string) => adminBookingRequest.accepted(id),
    onSuccess: async () => {
      await router.push("/admin/awaiting-student");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Chấp nhận thành công",
        })
      );
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
    },
  });

  const denyRequestMutation = useMutation({
    mutationKey: ["awaiting-student-request"],
    mutationFn: (id: string) => adminBookingRequest.cancel(id),
    onSuccess: async () => {
      await router.push("/admin/awaiting-student");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Từ chối thành công",
        })
      );
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
    },
  });

  return (
    <Card>
      <CardHeader
        title={
          <div className="flex gap-3 items-center">
            <span>
              {data?.lastname} {data?.firstname} - {data?.studentId}
            </span>

            <LoadingButton
              size="small"
              color="success"
              variant="contained"
              onClick={handleAccept}
              loading={acceptRequestMutation.isLoading}
              disabled={denyRequestMutation.isLoading}
            >
              Chấp nhận
            </LoadingButton>
            <LoadingButton
              disabled={acceptRequestMutation.isLoading}
              size="small"
              color="error"
              variant="contained"
              onClick={handleDeny}
              loading={denyRequestMutation.isLoading}
            >
              Từ chối
            </LoadingButton>
          </div>
        }
      />
      <Divider />
      <div className="p-10">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Họ và tên</span>:{" "}
              <span className="text-base">{`${data?.lastname} ${data?.firstname}`}</span>
            </div>
            <div className="mb-4">
              <span className="text-base font-bold">Mã số sinh viên</span>:{" "}
              <span className="text-base">{data?.studentId}</span>
            </div>
            <div className="mb-4">
              <span className="text-base font-bold">Ưu tiên</span>:{" "}
              <span className="text-base">{data?.priority.name}</span>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="mb-4">
              <span className="text-base font-bold">Địa chỉ Email</span>:{" "}
              <span className="text-base">{data?.email}</span>
            </div>
            <div className="mb-4">
              <span className="text-base font-bold">Giới tính</span>:{" "}
              <span className="text-base">{data?.gender}</span>
            </div>
          </Grid>
          <span className="text-base font-bold">Hình ảnh chứng thực:</span>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              {data?.images.map((item, index) => (
                <Grid item xs={3} key={index}>
                  <LazyLoadImage
                    className="w-full object-cover"
                    src={process.env.NEXT_PUBLIC_SERVER_URL + item}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default AwaitingStudentDetailContent;
