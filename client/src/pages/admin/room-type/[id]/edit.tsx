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
import { useQuery } from "react-query";
import adminRoomTypeAPI from "@/api/admin/roomType";

export interface IRoomTypeEditParams {
  name: string;
  desc: string;
}

const roomTypeEditSchema = yup.object({
  name: yup.string().required(),
  desc: yup.string().required(),
});

const RoomTypeEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm<IRoomTypeEditParams>({
    resolver: yupResolver(roomTypeEditSchema),
  });

  const roomTypeDetailQuery = useQuery({
    queryKey: ["room-type-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminRoomTypeAPI.getById;
      }
    },
  });

  const onSubmit: SubmitHandler<IRoomTypeEditParams> = async (data) => {
    console.log(data);
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
