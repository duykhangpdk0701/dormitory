import adminRoomAPI from "@/api/admin/room";
import adminServiceAPI from "@/api/admin/service";
import EditRoom from "@/components/App/Admin/Room/Edit";
import RoomDetail from "@/components/App/Admin/Room/detail";
import RoomDetailContent from "@/components/App/Admin/Room/detail/DetailContent";
import ServiceDetail from "@/components/App/Admin/Service/Detail";
import ServiceDetailContent from "@/components/App/Admin/Service/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";

import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const ServiceDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const serviceDetailQuery = useQuery({
    queryKey: ["service-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminServiceAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Chi tiết dịch vụ | SGU domitory" />
      <ServiceDetail
        detail={<ServiceDetailContent data={serviceDetailQuery.data} />}
      />
    </>
  );
};

ServiceDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ServiceDetailPage;
