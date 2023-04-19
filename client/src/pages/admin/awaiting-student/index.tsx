import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import AwaitingStudentRequest from "@/components/App/Admin/AwaitingStudentRequest/list";
import { useQuery } from "react-query";
import adminBookingRequest from "@/api/admin/bookingRequest";
import BookingRequestTable from "@/components/App/Admin/AwaitingStudentRequest/list/BookingRequestTable";

const AwaitingStudentRequestPage: NextPageWithLayout = () => {
  const awaitingStudentRequestQuery = useQuery({
    queryKey: ["awating-student-request"],
    queryFn: () => adminBookingRequest.getList(),
  });

  return (
    <>
      <Head>
        <title>Danh sách sinh viên đợi duyệt | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AwaitingStudentRequest
        table={<BookingRequestTable data={awaitingStudentRequestQuery.data} />}
      />
    </>
  );
};

AwaitingStudentRequestPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AwaitingStudentRequestPage;
