import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement, useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import roomTypeAPI from "@/api/roomType";
import PageHead from "@/components/PageHead";
import EditRoom from "@/components/App/Admin/Room/Edit";
import RoomFormEdit from "@/components/App/Admin/Room/Edit/form";
import adminRoomAPI from "@/api/admin/room";

export interface IEditRoomParams {
  id: string;
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

export interface IEditRoomFormParams {
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
  isActive: yup.boolean().required(),
  status: yup.boolean().required("Hãy nhập trạng thái"),
  numberOfPeople: yup.number().required("Hãy nhập sức chứa(người)"),
  numberBed: yup.number().required("Hãy nhập sức chứa(Giường)"),
  area: yup.number().required("Hãy nhập diện tích"),
  length: yup.number().required("Hãy nhập chiều dài"),
  width: yup.number().required("Hãy nhập chiều rộng"),
  floor: yup.number().required("Hãy nhập số tầng"),
  price: yup.number().required("Hãy nhập giá tiền"),
  roomType: yup.string().required(),
  images: yup.array().required(),
});

const EditRoomPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit, setValue } = useForm<IEditRoomFormParams>({
    defaultValues: {
      name: "",
      status: true,
    },
    // resolver: yupResolver(createRoomSchema),
  });

  const roomTypeQuery = useQuery({
    queryKey: ["room-type"],
    queryFn: () => roomTypeAPI.getListOfRoom(),
  });

  const roomDetailQuery = useQuery({
    queryKey: ["room-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminRoomAPI.getById(id);
      }

      return undefined;
    },

    onSuccess: (data) => {
      data?.name && setValue("name", data.name);
      data?.roomType && setValue("roomType", data.roomType._id);

      data?.description && setValue("description", data.description);
      data?.isActive && setValue("status", data.isActive);
      data?.numberPeople && setValue("numberOfPeople", data.numberPeople);
      data?.numberBed && setValue("numberBed", data.numberBed);
      data?.area && setValue("area", data.area);
      data?.length && setValue("length", data.length);
      data?.width && setValue("width", data.width);
      data?.price && setValue("price", data.price);
      data?.floor && setValue("floor", data.floor);
      data?.images && setValue("images", data.images);
    },
    enabled: roomTypeQuery.isFetched,
  });

  const roomEditMutation = useMutation({
    mutationKey: ["room"],
    mutationFn: ({
      id,
      name,
      roomType,
      description,
      status,
      numberOfPeople,
      numberBed,
      area,
      length,
      width,
      price,
      floor,
    }: IEditRoomParams) =>
      adminRoomAPI.update(
        id,
        name,
        roomType,
        description,
        status,
        numberOfPeople,
        numberBed,
        area,
        length,
        width,
        floor,
        price,
        []
      ),
  });

  const onSubmit: SubmitHandler<IEditRoomFormParams> = (data) => {
    if (id && typeof id !== "object") {
      roomEditMutation.mutate({ ...data, id });
    }
  };

  return (
    <>
      <PageHead title="Cập nhật Phòng | SGU domitory" />
      <EditRoom
        form={
          <RoomFormEdit
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={false}
            errorResMessage={error}
            roomTypes={roomTypeQuery.data}
            isLoadingRoomTypes={roomTypeQuery.isLoading}
          />
        }
      />
    </>
  );
};

EditRoomPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default EditRoomPage;
