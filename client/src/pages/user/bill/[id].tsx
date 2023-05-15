import billAPI from "@/api/bill";
import UserBillDetail from "@/components/App/User/Bill/Detail";
import UserBillDetailContent from "@/components/App/User/Bill/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const UserBillDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const civilianBillQuery = useQuery({
    queryKey: ["bill", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return billAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Hoá đơn | SGU dormitory" />
      <UserBillDetail
        detail={<UserBillDetailContent data={civilianBillQuery.data} />}
      />
    </>
  );
};

UserBillDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default UserBillDetailPage;
