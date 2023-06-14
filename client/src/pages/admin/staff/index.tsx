import adminStaffAPI from "@/api/admin/staff";
import Staff from "@/components/App/Admin/Staff/List";
import StaffTable from "@/components/App/Admin/Staff/List/StaffTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";

export interface IStaffParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const StaffPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IStaffParams>({
    defaultValues: {
      page: 1,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IStaffParams> = (data) => {
    console.log(data);
  };

  const staffListQuery = useQuery({
    queryKey: ["civilian", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminStaffAPI.getList(search, limit, page);
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
      <PageHead title="Danh sách nhân viên ký túc xá | SGU domitory" />
      <Staff
        table={
          <StaffTable
            data={staffListQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={staffListQuery.isLoading}
          />
        }
      />
    </>
  );
};

StaffPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default StaffPage;
