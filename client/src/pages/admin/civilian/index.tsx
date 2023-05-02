import adminCivilian from "@/api/admin/civilian";
import Civilian from "@/components/App/Admin/Civilian/List";
import CivilianTable from "@/components/App/Admin/Civilian/List/CivilianTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const CivilianPage: NextPageWithLayout = () => {
  const civilianListQuery = useQuery({
    queryKey: ["civilian"],
    queryFn: () => adminCivilian.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách cư dân ký túc xá | SGU domitory" />
      <Civilian table={<CivilianTable data={civilianListQuery.data} />} />
    </>
  );
};

CivilianPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default CivilianPage;
