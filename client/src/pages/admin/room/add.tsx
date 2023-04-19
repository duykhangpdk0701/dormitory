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
import { useQuery } from "react-query";
import roomTypeAPI from "@/api/roomType";

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
  roomType: yup.string().required(),
});

const AddRoomPage: NextPageWithLayout = () => {
  const router = useRouter();
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

  const onSubmit: SubmitHandler<ICreateRoomParams> = (data) => {
    const { name, description, status, numberOfPeople } = data;
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Thêm Phòng | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddRoom
        form={
          <RoomFormAdd
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

AddRoomPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AddRoomPage;
