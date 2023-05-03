import React, { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import AwaitingStudentRequest from "@/components/App/Admin/AwaitingStudentRequest/list";
import { useQuery } from "react-query";
import adminBookingRequest from "@/api/admin/bookingRequest";
import BookingRequestTable from "@/components/App/Admin/AwaitingStudentRequest/list/BookingRequestTable";
import PageHead from "@/components/PageHead";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import queryString from "query-string";

export interface IAwaitingStudentParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const AwaitingStudentRequestPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IAwaitingStudentParams>({
    defaultValues: {
      page: 0,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IAwaitingStudentParams> = (data) => {
    console.log(data);
  };

  const awaitingStudentRequestQuery = useQuery({
    queryKey: ["awating-student-request", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminBookingRequest.getList(search, limit, page);
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
      <PageHead title="Danh sách sinh viên đợi duyệt | SGU domitory" />
      <AwaitingStudentRequest
        table={
          <BookingRequestTable
            data={awaitingStudentRequestQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={awaitingStudentRequestQuery.isLoading}
          />
        }
      />
    </>
  );
};

AwaitingStudentRequestPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AwaitingStudentRequestPage;
