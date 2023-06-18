import staffTaskAPI from "@/api/staff/task";
import StaffTaskDetail from "@/components/App/Staff/Task/Detail";
import StaffTaskDetailContent from "@/components/App/Staff/Task/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";

import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const StaffTaskDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const taskDetailQuery = useQuery({
    queryKey: ["task"],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return staffTaskAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Chi tiết công việc | SGU dormitory" />
      <StaffTaskDetail
        detail={<StaffTaskDetailContent data={taskDetailQuery.data} />}
      />
    </>
  );
};

StaffTaskDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="staff">{page}</SidebarLayout>;
};

export default StaffTaskDetailPage;
