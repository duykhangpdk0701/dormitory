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
import { useMutation } from "react-query";
import categoryAPI from "@/api/categoryAPI";

export interface ICreateRoomParams {
  name: string;
  slug: string;
  status: boolean;
  order: number;
}

const createRoomSchema = yup.object({
  name: yup.string().required("Hãy nhập tên phòng"),
  slug: yup.string().required(),
  status: yup.boolean().required(),
  order: yup.string().required(),
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

  const onSubmit: SubmitHandler<ICreateRoomParams> = (data) => {
    const { name, slug, order, status } = data;
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
