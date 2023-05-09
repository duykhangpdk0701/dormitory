import adminJobAPI from "@/api/admin/job";
import JobDetail from "@/components/App/Admin/Job/Detail";
import JobDetailContent from "@/components/App/Admin/Job/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const JobDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const JobDetailQuery = useQuery({
    queryKey: ["job-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminJobAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Công việc | SGU domitory" />
      <JobDetail detail={<JobDetailContent data={JobDetailQuery.data} />} />;
    </>
  );
};

JobDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default JobDetailPage;
