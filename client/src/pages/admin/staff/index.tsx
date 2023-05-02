import adminStaffAPI from "@/api/admin/staff";
import Staff from "@/components/App/Admin/Staff/List";
import StaffTable from "@/components/App/Admin/Staff/List/StaffTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const StaffPage: NextPageWithLayout = () => {
  const staffListQuery = useQuery({
    queryKey: ["civilian"],
    queryFn: () => adminStaffAPI.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách nhân viên ký túc xá | SGU domitory" />
      <Staff table={<StaffTable data={staffListQuery.data} />} />
    </>
  );
};

StaffPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default StaffPage;
