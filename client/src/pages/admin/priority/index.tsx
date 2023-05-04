import adminPriority from "@/api/admin/priority";
import Priority from "@/components/App/Admin/Priority/List";
import PriorityTable from "@/components/App/Admin/Priority/List/PriorityTable";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";

import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import PageHead from "@/components/PageHead";
import { useRouter } from "next/router";
import queryString from "query-string";
export interface IPriorityParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const PriorityPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IPriorityParams>({
    defaultValues: {
      page: 0,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IPriorityParams> = (data) => {
    console.log(data);
  };

  const priority = useQuery({
    queryKey: ["priority", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminPriority.getList(search, limit, page);
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
      <PageHead title="Danh sách quyền | SGU domitory" />
      <Priority
        table={
          <PriorityTable
            data={priority.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={priority.isLoading}
          />
        }
      />
    </>
  );
};

PriorityPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PriorityPage;
