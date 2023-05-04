import adminComplaintAPI from "@/api/admin/complaint";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const ComplaintPage: NextPageWithLayout = () => {
  const complaintListQuery = useQuery({
    queryKey: ["complaint"],
    queryFn: () => adminComplaintAPI.getList(),
  });
  return (
    <>
      <PageHead title="Danh sách cư dân ký túc xá | SGU domitory" />
    </>
  );
};

ComplaintPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ComplaintPage;
