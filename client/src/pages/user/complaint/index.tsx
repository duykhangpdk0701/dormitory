import React, { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";
import ComplaintList from "@/components/App/Complaint/List";
import ComplaintListList from "@/components/App/Complaint/List/List";
import { useQuery } from "react-query";
import adminComplaintAPI from "@/api/admin/complaint";

const ComplaintListPage: NextPageWithLayout = () => {
  const complantQuery = useQuery({
    queryKey: ["complant"],
    queryFn: () => adminComplaintAPI.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách khiếu nại | SGU domitory" />
      <ComplaintList list={<ComplaintListList />} />
    </>
  );
};

ComplaintListPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default ComplaintListPage;
