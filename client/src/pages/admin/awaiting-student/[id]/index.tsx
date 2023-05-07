import adminBookingRequest from "@/api/admin/bookingRequest";
import AwaitingStudentRequestDetail from "@/components/App/Admin/AwaitingStudentRequest/detail";
import AwaitingStudentDetailContent from "@/components/App/Admin/AwaitingStudentRequest/detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const AwaitingStudentRequestDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const awatingStudentDetail = useQuery({
    queryKey: ["awaiting-student-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminBookingRequest.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Sinh viên đợi duyệt | SGU domitory" />
      <AwaitingStudentRequestDetail
        detail={
          <AwaitingStudentDetailContent data={awatingStudentDetail.data} />
        }
      />
    </>
  );
};

AwaitingStudentRequestDetailPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AwaitingStudentRequestDetailPage;
