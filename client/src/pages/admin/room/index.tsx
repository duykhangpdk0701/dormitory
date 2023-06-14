import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import adminRoomAPI from "@/api/admin/room";
import Rooms from "@/components/App/Admin/Room/List";
import RoomTable from "@/components/App/Admin/Room/List/Table";
import PageHead from "@/components/PageHead";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import queryString from "query-string";

export interface IRoomParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const RoomPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IRoomParams>({
    defaultValues: {
      page: 1,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IRoomParams> = (data) => {
    console.log(data);
  };

  const roomQuery = useQuery({
    queryKey: ["room", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminRoomAPI.getList(search, limit || 5, page || 1);
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
      <PageHead title="Danh sách phòng | SGU domitory" />
      <Rooms
        roomsTable={
          <RoomTable
            data={roomQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={roomQuery.isLoading}
          />
        }
      />
    </>
  );
};

RoomPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default RoomPage;
