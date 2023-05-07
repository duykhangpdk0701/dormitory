import React, { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";

import ContractList from "@/components/App/User/Contract";
import ContractListList from "@/components/App/User/Contract/List";

const ContractListPage: NextPageWithLayout = () => {
  return (
    <>
      <PageHead title="Danh sách hợp đồng | SGU domitory" />
      <ContractList list={<ContractListList />} />
    </>
  );
};

ContractListPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default ContractListPage;
