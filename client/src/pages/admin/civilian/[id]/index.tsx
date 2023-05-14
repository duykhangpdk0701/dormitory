import adminBooking from "@/api/admin/booking";
import adminCivilianAPI from "@/api/admin/civilian";
import BookingDetail from "@/components/App/Admin/Booking/detail";
import BookingDetailContent from "@/components/App/Admin/Booking/detail/DetailContent";
import CivilianDetail from "@/components/App/Admin/Civilian/detail";
import CivilianDetailContent from "@/components/App/Admin/Civilian/detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const CivilianDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const civilianDetailQuery = useQuery({
    queryKey: ["civilian-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminCivilianAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Cư dân | SGU domitory" />
      <CivilianDetail
        detail={<CivilianDetailContent data={civilianDetailQuery.data} />}
      />
    </>
  );
};

CivilianDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default CivilianDetailPage;
