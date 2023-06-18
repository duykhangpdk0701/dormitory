import adminServiceAPI from "@/api/admin/service";
import ServiceDetail from "@/components/App/User/Service/Detail";
import ServiceDetailContent from "@/components/App/User/Service/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const DetailServicePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const serviceDetailQuery = useQuery({
    queryKey: ["service"],
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

DetailServicePage.getLayout = function getLayout(page) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default DetailServicePage;
