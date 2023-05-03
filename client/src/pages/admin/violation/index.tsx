import adminViolationAPI from "@/api/admin/violation";
import Violation from "@/components/App/Admin/Violation/List";
import ViolationTable from "@/components/App/Admin/Violation/List/ViolationTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";

export interface IViolationParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const ViolationPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IViolationParams>({
    defaultValues: {
      page: 0,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IViolationParams> = (data) => {
    console.log(data);
  };

  const violationListQuery = useQuery({
    queryKey: ["violation", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminViolationAPI.getList(search, limit, page);
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
      <PageHead title="Danh sách vi phạm | SGU domitory" />
      <Violation
        table={
          <ViolationTable
            data={violationListQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={violationListQuery.isLoading}
          />
        }
      />
    </>
  );
};

ViolationPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ViolationPage;
