import adminServiceAPI from "@/api/admin/service";
import ServiceList from "@/components/App/User/Service/List";
import ServiceListList from "@/components/App/User/Service/List/List";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const ServiceListPage: NextPageWithLayout = () => {
  const serviceListQuery = useQuery({
    queryKey: ["service"],
    queryFn: () => adminServiceAPI.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách dịch vụ | SGU domitory" />
      <ServiceList list={<ServiceListList data={serviceListQuery.data} />} />
    </>
  );
};

ServiceListPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default ServiceListPage;
