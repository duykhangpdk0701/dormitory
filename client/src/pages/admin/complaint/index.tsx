import adminComplaintAPI from "@/api/admin/complaint";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import queryString from "query-string";
import Complaint from "@/components/App/Admin/Complaint/List";
import ComplaintTable from "@/components/App/Admin/Complaint/List/ComplaintTable";

export interface IComplaintParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const ComplaintPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IComplaintParams>({
    defaultValues: {
      page: 1,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IComplaintParams> = (data) => {
    console.log(data);
  };

  const complaintListQuery = useQuery({
    queryKey: ["complaint", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminComplaintAPI.getList(search, limit, page);
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
      <PageHead title="Danh sách khiếu nại túc xá | SGU domitory" />
      <Complaint
        table={
          <ComplaintTable
            data={complaintListQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={complaintListQuery.isLoading}
          />
        }
      />
    </>
  );
};

ComplaintPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ComplaintPage;
