import adminBooking from "@/api/admin/booking";
import Booking from "@/components/App/Admin/Booking/list";
import BookingTable from "@/components/App/Admin/Booking/list/BookingTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";

export interface IBookingParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const BookingPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IBookingParams>({
    defaultValues: {
      page: 1,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IBookingParams> = (data) => {
    console.log(data);
  };

  const bookingListQuery = useQuery({
    queryKey: ["booking", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminBooking.getList(search, limit, page);
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
      <PageHead title="Danh sách sinh viên dã duyệt | SGU domitory" />
      <Booking
        table={
          <BookingTable
            data={bookingListQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={bookingListQuery.isLoading}
          />
        }
      />
    </>
  );
};

BookingPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default BookingPage;
