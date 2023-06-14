import adminRoomTypeAPI from "@/api/admin/roomType";
import RoomType from "@/components/App/Admin/RoomType/List";
import RoomTypeTable from "@/components/App/Admin/RoomType/List/Table";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import queryString from "query-string";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import PageHead from "@/components/PageHead";

export interface IRoomTypeParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const RoomTypePage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IRoomTypeParams>({
    defaultValues: {
      page: 1,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IRoomTypeParams> = (data) => {
    console.log(data);
  };

  const roomTypeQuery = useQuery({
    queryKey: ["room-type", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminRoomTypeAPI.getList(search, limit, page);
      }
      return undefined;
    },
  });

  useEffect(() => {
    watch(async (value) => {
      const stringUrl = queryString.stringify(value);
      await router.push(
        { query: queryString.parse(stringUrl) as any },
        undefined,
        {
          shallow: true,
        }
      );
    });
  }, []);

  return (
    <>
      <PageHead title="Danh sách Loại Phòng | SGU domitory" />
      <RoomType
        roomTypeTable={
          <RoomTypeTable
            data={roomTypeQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={roomTypeQuery.isLoading}
          />
        }
      />
    </>
  );
};

RoomTypePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default RoomTypePage;
