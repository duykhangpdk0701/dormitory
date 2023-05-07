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

  const onSubmit: SubmitHandler<IRoomTypeCreateParams> = async (data) => {
    console.log(data);
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
