import adminCivilianAPI from "@/api/admin/civilian";
import adminComplaintAPI from "@/api/admin/complaint";
import CivilianDetail from "@/components/App/Admin/Civilian/detail";
import CivilianDetailContent from "@/components/App/Admin/Civilian/detail/DetailContent";
import ComplaintDetail from "@/components/App/Admin/Complaint/Detail";
import ComplaintDetailContent from "@/components/App/Admin/Complaint/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const ComplaintDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const complaintDetailQuery = useQuery({
    queryKey: ["complaint-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminComplaintAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Cư dân | SGU domitory" />
      <ComplaintDetail
        detail={<ComplaintDetailContent data={complaintDetailQuery.data} />}
      />
    </>
  );
};

ComplaintDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ComplaintDetailPage;
