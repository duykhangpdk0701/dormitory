import React, { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";

import ContractList from "@/components/App/User/Contract";
import ContractListList from "@/components/App/User/Contract/List";
import { useQuery } from "react-query";
import contractAPI from "@/api/contract";

const ContractListPage: NextPageWithLayout = () => {
  const contractQuery = useQuery({
    queryKey: ["contract"],
    queryFn: () => {
      const civilianId = sessionStorage.getItem("id");
      if (!civilianId) return undefined;
      return contractAPI.getListById(civilianId);
    },
  });

  return (
    <>
      <PageHead title="Danh sách hợp đồng | SGU domitory" />
      <ContractList list={<ContractListList data={contractQuery.data} />} />
    </>
  );
};

ContractListPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default ContractListPage;
