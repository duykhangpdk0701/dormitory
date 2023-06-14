import adminCivilianAPI from "@/api/admin/civilian";
import Civilian from "@/components/App/Admin/Civilian/List";
import CivilianTable from "@/components/App/Admin/Civilian/List/CivilianTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import queryString from "query-string";

export interface ICivilianParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const CivilianPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<ICivilianParams>({
    defaultValues: {
      page: 1,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<ICivilianParams> = (data) => {
    console.log(data);
  };

  const civilianListQuery = useQuery({
    queryKey: ["civilian", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminCivilianAPI.getList(search, limit, page);
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
      <PageHead title="Danh sách cư dân ký túc xá | SGU domitory" />
      <Civilian
        table={
          <CivilianTable
            data={civilianListQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={civilianListQuery.isLoading}
          />
        }
      />
    </>
  );
};

CivilianPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default CivilianPage;
