import AddRoom from "@/components/App/Admin/Room/Add";
import RoomFormAdd from "@/components/App/Admin/Room/Add/form";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import roomTypeAPI from "@/api/roomType";
import PageHead from "@/components/PageHead";
import adminRoomAPI from "@/api/admin/room";
import { useAppDispatch } from "@/hooks/redux";
import { setSnackbar } from "@/contexts/slices/snackbarSlice";

export interface ICreateRoomParams {
  name: string;
  description: string;
  status: boolean;
  numberOfPeople: number;
  numberBed: number;
  area: number;
  length: number;
  width: number;
  floor: number;
  price: number;
  roomType: string;
  images: File[];
}

const createRoomSchema = yup.object({
  name: yup.string().required("Hãy nhập tên phòng"),
  description: yup.string().required("Hãy nhập mô tả phòng"),
  status: yup.boolean().required("Hãy nhập trạng thái"),
  numberOfPeople: yup.number().required("Hãy nhập sức chứa(người)"),
  numberBed: yup.number().required("Hãy nhập sức chứa(Giường)"),
  area: yup.number().required("Hãy nhập diện tích"),
  length: yup.number().required("Hãy nhập chiều dài"),
  width: yup.number().required("Hãy nhập chiều rộng"),
  floor: yup.number().required("Hãy nhập số tầng"),
  price: yup.number().required("Hãy nhập giá tiền"),
  images: yup.array().required(),
  roomType: yup.string().required(),
});

const AddRoomPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit } = useForm<ICreateRoomParams>({
    defaultValues: {
      status: true,
    },
    resolver: yupResolver(createRoomSchema),
  });

  const roomTypeQuery = useQuery({
    queryKey: ["room-type"],
    queryFn: () => roomTypeAPI.getListOfRoom(),
  });

  const roomMutation = useMutation({
    mutationKey: ["room"],
    mutationFn: ({
      name,
      description,
      status,
      numberOfPeople,
      numberBed,
      area,
      length,
      width,
      floor,
      price,
      images,
      roomType,
    }: ICreateRoomParams) =>
      adminRoomAPI.create(
        name,
        description,
        status,
        numberOfPeople,
        numberBed,
        area,
        length,
        width,
        floor,
        price,
        images,
        roomType
      ),
    onSuccess: async () => {
      await router.push("/admin/room");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Tạo phòng thành công",
        })
      );
      setLoading(false);
    },
    onError: (error: any) => {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: error.message,
        })
      );
      setLoading(false);
    },
  });

  const onSubmit: SubmitHandler<ICreateRoomParams> = (data) => {
    setLoading(true);
    roomMutation.mutate({ ...data });
  };

  return (
    <>
      <PageHead title="Thêm Phòng | SGU domitory" />
      <AddRoom
        form={
          <RoomFormAdd
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={loading}
            errorResMessage={error}
            roomTypes={roomTypeQuery.data}
            isLoadingRoomTypes={roomTypeQuery.isLoading}
          />
        }
      />
    </>
  );
};

AddRoomPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AddRoomPage;
