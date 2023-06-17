import adminRequestChangeRoomeAPI from "@/api/admin/requestChangeRoomAPI";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";
import AdminRequestChangeRoom from "@/components/App/Admin/RequestChangeRoom/List";
import AdminRequestChangeRoomTable from "@/components/App/Admin/RequestChangeRoom/List/Table";

export interface IAdminRequestChangeRoomParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const AdminRequestChangeRoomPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } =
    useForm<IAdminRequestChangeRoomParams>({
      defaultValues: {
        page: 1,
        rowPerPage: 5,
      },
    });
  const onSubmit: SubmitHandler<IAdminRequestChangeRoomParams> = (data) => {
    console.log(data);
  };

  const requestChangeRoom = useQuery({
    queryKey: ["request-change-room"],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminRequestChangeRoomeAPI.getAll(search, limit || 5, page || 1);
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
      <PageHead title="Danh sách yêu cầu chuyển phòng | SGU domitory" />
      <AdminRequestChangeRoom
        requestChangeRoomTable={
          <AdminRequestChangeRoomTable
            data={requestChangeRoom.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={requestChangeRoom.isLoading}
          />
        }
      />
    </>
  );
};

AdminRequestChangeRoomPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AdminRequestChangeRoomPage;
