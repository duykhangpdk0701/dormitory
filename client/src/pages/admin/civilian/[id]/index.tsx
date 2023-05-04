import adminBooking from "@/api/admin/booking";
import BookingDetail from "@/components/App/Admin/Booking/detail";
import BookingDetailContent from "@/components/App/Admin/Booking/detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const BookingDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const bookingDetailQuery = useQuery({
    queryKey: ["booking-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminBooking.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Sinh viên đã duyệt | SGU domitory" />
      <BookingDetail
        detail={<BookingDetailContent data={bookingDetailQuery.data} />}
      />
    </>
  );
};

BookingDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default BookingDetailPage;
