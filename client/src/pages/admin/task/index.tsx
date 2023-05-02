import adminTaskAPI from "@/api/admin/task";
import Task from "@/components/App/Admin/Task/List";
import TaskTable from "@/components/App/Admin/Task/List/TaskTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const TaskPage: NextPageWithLayout = () => {
  const taskListQuery = useQuery({
    queryKey: ["task"],
    queryFn: () => adminTaskAPI.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách nhiệm vụ ký túc xá | SGU domitory" />
      <Task table={<TaskTable data={taskListQuery.data} />} />
    </>
  );
};

TaskPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default TaskPage;
