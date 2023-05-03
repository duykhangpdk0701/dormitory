import adminDeviceAPI from "@/api/admin/device";
import Device from "@/components/App/Admin/Device/List";
import DeviceTable from "@/components/App/Admin/Device/List/DeviceTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const DevicePage: NextPageWithLayout = () => {
  const deviceQuery = useQuery({
    queryKey: ["device"],
    queryFn: () => adminDeviceAPI.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách thiết bị ký túc xá | SGU domitory" />
      <Device table={<DeviceTable data={deviceQuery.data} />} />
    </>
  );
};

DevicePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default DevicePage;
