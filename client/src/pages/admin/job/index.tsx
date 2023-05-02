import adminJobAPI from "@/api/admin/job";
import Job from "@/components/App/Admin/Job/List";
import JobTable from "@/components/App/Admin/Job/List/JobTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const JobPage: NextPageWithLayout = () => {
  const jobListQuery = useQuery({
    queryKey: ["job"],
    queryFn: () => adminJobAPI.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách cư dân ký túc xá | SGU domitory" />
      <Job table={<JobTable data={jobListQuery.data} />} />
    </>
  );
};

JobPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default JobPage;
