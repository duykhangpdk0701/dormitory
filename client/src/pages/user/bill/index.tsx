import billAPI from "@/api/bill";
import BillList from "@/components/App/User/Bill/List";
import BillListList from "@/components/App/User/Bill/List/List";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const UserBillPage: NextPageWithLayout = () => {
  const civilianBillQuery = useQuery({
    queryKey: ["bill"],
    queryFn: () => {
      const civilianId = sessionStorage.getItem("id");
      if (civilianId) {
        return billAPI.getByCivilianId(civilianId);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Danh sách hoá đơn | SGU dormitory" />
      <BillList list={<BillListList data={civilianBillQuery.data} />} />
    </>
  );
};

UserBillPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default UserBillPage;
