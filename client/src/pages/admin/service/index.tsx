import adminServiceAPI from "@/api/admin/service";
import Service from "@/components/App/Admin/Service/List";
import ServiceTable from "@/components/App/Admin/Service/List/JobTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const ServicePage: NextPageWithLayout = () => {
  const serviceListQuery = useQuery({
    queryKey: ["service"],
    queryFn: () => adminServiceAPI.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách dịch vụ ký túc xá | SGU domitory" />
      <Service table={<ServiceTable data={serviceListQuery.data} />} />
    </>
  );
};

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout> {page}</SidebarLayout>;
};

export default ServicePage;
