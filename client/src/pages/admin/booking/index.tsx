import adminBooking from "@/api/admin/booking";
import Booking from "@/components/App/Admin/Booking/list";
import BookingTable from "@/components/App/Admin/Booking/list/BookingTable";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const BookingPage: NextPageWithLayout = () => {
  const bookingListQuery = useQuery({
    queryKey: ["booking"],
    queryFn: () => adminBooking.getList(),
  });

  return (
    <>
      <Head>
        <title>Danh sách sinh viên dã duyệt | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Booking table={<BookingTable data={bookingListQuery.data} />} />
    </>
  );
};

BookingPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default BookingPage;
