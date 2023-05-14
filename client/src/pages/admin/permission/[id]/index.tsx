import adminPermissionAPI from "@/api/admin/permission";
import PermissionDetail from "@/components/App/Admin/Permission/Detail";
import PermissionDetailContent from "@/components/App/Admin/Permission/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const PermissionDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const permissionDetailQuery = useQuery({
    queryKey: ["permission-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminPermissionAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Quyền | SGU domitory" />
      <PermissionDetail
        detail={<PermissionDetailContent data={permissionDetailQuery.data} />}
      />
      ;
    </>
  );
};

PermissionDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PermissionDetailPage;
