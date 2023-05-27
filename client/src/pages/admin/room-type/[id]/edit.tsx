import { useAppDispatch } from "@/hooks/redux";
import { NextPageWithLayout } from "@/pages/_app";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";
import RoomTypeEdit from "@/components/App/Admin/RoomType/Edit";
import RoomTypeEditForm from "@/components/App/Admin/RoomType/Edit/Form";
import { useMutation, useQuery } from "react-query";
import adminRoomTypeAPI from "@/api/admin/roomType";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";

export interface IRoomTypeEditFormParams {
  name: string;
  desc: string;
  price: number;
  images: File[];
}

export interface IRoomTypeEditParams {
  id: string;
  name: string;
  desc: string;
  price: number;
  images: File[];
}
const roomTypeEditSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
  price: yup.string().required(),
  images: yup.object().required(),
});

const RoomTypeEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { control, handleSubmit, setValue } = useForm<IRoomTypeEditFormParams>({
    resolver: yupResolver(roomTypeEditSchema),
  });

  const roomTypeDetailQuery = useQuery({
    queryKey: ["room-type-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminRoomTypeAPI.getById(id);
      }
    },
    onSuccess: (data) => {
      data?.name && setValue("name", data.name);
      data?.description && setValue("desc", data.description);
    },
    onError: (error: any) => {
      if (error.code === 500) {
        router.replace("/404");
      }
    },
  });

  const roomTypeEditMutation = useMutation({
    mutationKey: ["room-type"],
    mutationFn: ({ id, name, desc, price, images }: IRoomTypeEditParams) =>
      adminRoomTypeAPI.update(id, name, desc, price, images),
    onSuccess: async () => {
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

  const onSubmit: SubmitHandler<IRoomTypeEditFormParams> = async (data) => {
    if (id && typeof id !== "object") {
      setLoading(true);
      roomTypeEditMutation.mutate({ ...data, id });
    }
  };

  return (
    <>
      <PageHead title="Thêm loại phòng | SGU domitory" />
      <RoomTypeEdit
        form={
          <RoomTypeEditForm
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

RoomTypeEditPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default RoomTypeEditPage;
