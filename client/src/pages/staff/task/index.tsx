import staffTaskAPI from "@/api/staff/task";
import StaffTaskList from "@/components/App/Staff/Task/List";
import StaffTaskListList from "@/components/App/Staff/Task/List/List";
import PageHead from "@/components/PageHead";

import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const StaffTaskPage: NextPageWithLayout = () => {
  const taskListQuery = useQuery({
    queryKey: ["task"],
    queryFn: () => {
      const accountId = sessionStorage.getItem("accountId");
      if (accountId) return staffTaskAPI.getByAccountId(accountId);
    },
  });

  return (
    <>
      <PageHead title="Công việc | SGU dormitory" />
      <StaffTaskList list={<StaffTaskListList data={taskListQuery.data} />} />
    </>
  );
};

StaffTaskPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="staff">{page}</SidebarLayout>;
};

export default StaffTaskPage;
