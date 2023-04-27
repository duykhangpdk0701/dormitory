import adminPermission from "@/api/admin/permission";
import Permission from "@/components/App/Admin/Permission/List";
import PermissionTable from "@/components/App/Admin/Permission/List/PermissionTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const PermissionPage: NextPageWithLayout = () => {
  const permissionQuery = useQuery({
    queryKey: ["permission"],
    queryFn: () => adminPermission.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách quyền | SGU domitory" />
      <Permission table={<PermissionTable data={permissionQuery.data} />} />
    </>
  );
};

PermissionPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PermissionPage;
