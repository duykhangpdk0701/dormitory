import adminTaskAPI from "@/api/admin/task";
import Task from "@/components/App/Admin/Task/List";
import TaskTable from "@/components/App/Admin/Task/List/TaskTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import queryString from "query-string";

export interface ITaskParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const TaskPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<ITaskParams>({
    defaultValues: {
      page: 0,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<ITaskParams> = (data) => {
    console.log(data);
  };

  const taskListQuery = useQuery({
    queryKey: ["task", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminTaskAPI.getList(search, limit, page);
      }
      return undefined;
    },
  });

  useEffect(() => {
    watch(async (value) => {
      const stringUrl = queryString.stringify(value);
      await router.push(
        { query: queryString.parse(stringUrl) as any },
        undefined,
        {
          shallow: true,
        }
      );
    });
  }, []);

  return (
    <>
      <PageHead title="Danh sách nhiệm vụ ký túc xá | SGU domitory" />
      <Task
        table={
          <TaskTable
            data={taskListQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={taskListQuery.isLoading}
          />
        }
      />
    </>
  );
};

TaskPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default TaskPage;
