import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";
import ComplaintList from "@/components/App/Complaint/List";
import ComplaintListList from "@/components/App/Complaint/List/List";

const ComplaintListPage: NextPageWithLayout = () => {
  return (
    <>
      <PageHead title="Danh sách khiếu nại | SGU domitory" />
      <ComplaintList list={<ComplaintListList />} />
    </>
  );
};

ComplaintListPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ComplaintListPage;
