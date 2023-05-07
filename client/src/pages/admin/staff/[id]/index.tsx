import adminStaffAPI from "@/api/admin/staff";
import StaffDetail from "@/components/App/Admin/Staff/detail";
import StaffDetailContent from "@/components/App/Admin/Staff/detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const StaffDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const staffDetailQuery = useQuery({
    queryKey: ["civilian-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminStaffAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Cư dân | SGU domitory" />
      <StaffDetail
        detail={<StaffDetailContent data={staffDetailQuery.data} />}
      />
    </>
  );
};

StaffDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default StaffDetailPage;
