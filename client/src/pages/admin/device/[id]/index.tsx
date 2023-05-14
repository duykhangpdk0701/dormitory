import adminDeviceAPI from "@/api/admin/device";
import DeviceDetail from "@/components/App/Admin/Device/Detail";
import DeviceDetailContent from "@/components/App/Admin/Device/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const DeviceDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const deviceDetailQuery = useQuery({
    queryKey: ["device-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminDeviceAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Thiết bị | SGU domitory" />
      <DeviceDetail
        detail={<DeviceDetailContent data={deviceDetailQuery.data} />}
      />
    </>
  );
};

DeviceDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default DeviceDetailPage;
