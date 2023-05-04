import adminServiceAPI from "@/api/admin/service";
import Service from "@/components/App/Admin/Service/List";
import ServiceTable from "@/components/App/Admin/Service/List/ServiceTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";

export interface IServiceParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const ServicePage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IServiceParams>({
    defaultValues: {
      page: 0,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IServiceParams> = (data) => {
    console.log(data);
  };

  const serviceListQuery = useQuery({
    queryKey: ["service", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminServiceAPI.getList(search, limit, page);
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
      <PageHead title="Danh sách dịch vụ ký túc xá | SGU domitory" />
      <Service
        table={
          <ServiceTable
            data={serviceListQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={serviceListQuery.isLoading}
          />
        }
      />
    </>
  );
};

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout> {page}</SidebarLayout>;
};

export default ServicePage;
