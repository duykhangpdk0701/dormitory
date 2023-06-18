import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { ReactElement, useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import ElectronicWaterAPI from "@/api/staff/electronicWaterAPI";
import ElectronicWaterCreate from "@/components/App/Staff/ElectronicWater/Create";
import ElectronicWaterCreateForm from "@/components/App/Staff/ElectronicWater/Create/Form";
import adminRoomAPI from "@/api/admin/room";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";
import { useAppDispatch } from "@/hooks/redux";

export interface IElectronicWaterCreateParams {
  roomId: string;
  numberStart: number;
  numberEnd: number;
}

const electronicWaterCreateSchema = yup.object({
  roomId: yup.string().required("Vui lòng chọ phòng"),
  numberStart: yup
    .string()
    .required("Vui lofng nhập số bắt đầu")
    .min(1, "Vui lòng không điền số âm"),
  numberEnd: yup
    .string()
    .required("Vui lòng nhập số kết thúc")
    .min(1, "Vui lòng không điền số âm"),
});

const ElectronicWaterCreatePage: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const roomQuery = useQuery({
    queryKey: ["room-type"],
    queryFn: () => adminRoomAPI.getList(),
  });

  const createElectronicWaterMutation = useMutation({
    mutationKey: ["room-type"],
    mutationFn: ({
      roomId,
      numberStart,
      numberEnd,
    }: IElectronicWaterCreateParams) =>
      ElectronicWaterAPI.create(roomId, numberStart, numberEnd),
    onSuccess: () => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Ghi thành công",
        })
      );
      setLoading(false);
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.messages,
        })
      );
      setLoading(false);
    },
  });

  const { control, handleSubmit } = useForm<IElectronicWaterCreateParams>({
    resolver: yupResolver(electronicWaterCreateSchema),
    defaultValues: {
      roomId: "",
    },
  });

  const onSubmit: SubmitHandler<IElectronicWaterCreateParams> = async (
    data
  ) => {
    setLoading(true);
    createElectronicWaterMutation.mutateAsync({ ...data });
  };

  return (
    <>
      <PageHead title="Ghi điện nước | SGU domitory" />
      <ElectronicWaterCreate
        form={
          <ElectronicWaterCreateForm
            control={control}
            isLoading={loading}
            errorResMessage={error}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            room={roomQuery.data}
            isLoadingRoom={roomQuery.isLoading}
          />
        }
      />
    </>
  );
};

ElectronicWaterCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="staff">{page}</SidebarLayout>;
};

export default ElectronicWaterCreatePage;
