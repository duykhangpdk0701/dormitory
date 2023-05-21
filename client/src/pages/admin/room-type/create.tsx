import { useAppDispatch } from "@/hooks/redux";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";
import RoomTypeCreate from "@/components/App/Admin/RoomType/Create";
import RoomTypeCreateForm from "@/components/App/Admin/RoomType/Create/Form";
import { useMutation } from "react-query";
import adminRoomTypeAPI from "@/api/admin/roomType";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";

export interface IRoomTypeCreateParams {
  name: string;
  desc: string;
}

const roomTypeCreateSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
});

const RoomTypeCreatePage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm<IRoomTypeCreateParams>({
    resolver: yupResolver(roomTypeCreateSchema),
  });

  const roomTypeMutation = useMutation({
    mutationKey: "room-type",
    mutationFn: ({ name, desc }: IRoomTypeCreateParams) =>
      adminRoomTypeAPI.create(name, desc),
    onSuccess: async (data) => {
      await router.push("/admin/room-type");
      setLoading(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo loại phòng thành công",
        })
      );
    },
    onError: (error: any) => {
      setLoading(false);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
    },
  });

  const onSubmit: SubmitHandler<IRoomTypeCreateParams> = async (data) => {
    setLoading(true);
    roomTypeMutation.mutate({ ...data });
  };

  return (
    <>
      <PageHead title="Thêm loại phòng | SGU domitory" />
      <RoomTypeCreate
        form={
          <RoomTypeCreateForm
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
          />
        }
      />
    </>
  );
};

RoomTypeCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default RoomTypeCreatePage;
