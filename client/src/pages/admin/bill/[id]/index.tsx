import adminBillAPI from "@/api/admin/bill";
import BillDetail from "@/components/App/Admin/Bill/Detail";
import BillDetailContent from "@/components/App/Admin/Bill/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const BillDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const billDetailQuery = useQuery({
    queryKey: ["bill-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminBillAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Hoá đơn | SGU domitory" />
      <BillDetail detail={<BillDetailContent data={billDetailQuery.data} />} />;
    </>
  );
};

BillDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default BillDetailPage;
