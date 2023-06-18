import serviceUsageAPI from "@/api/serviceUsageAPI";
import Service from "@/components/App/User/Service/UsageList";
import ServiceTable from "@/components/App/User/Service/UsageList/ServiceTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";

export interface IListEnrolledServiceParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const EnrolledServicePage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IListEnrolledServiceParams>({
    defaultValues: {
      page: 1,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IListEnrolledServiceParams> = (data) => {
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
        const civilianId = sessionStorage.getItem("id");
        if (!civilianId) return undefined;
        return serviceUsageAPI.getByUserId(civilianId, search, limit, page);
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
      <PageHead title="Danh sách dịch vụ đã đăng ký | SGU dormitory" />
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

EnrolledServicePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default EnrolledServicePage;
