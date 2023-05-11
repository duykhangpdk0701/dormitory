import adminContractAPI from "@/api/admin/contract";
import adminJobAPI from "@/api/admin/job";
import ContractDetail from "@/components/App/Admin/Contract/Detail";
import ContractDetailContent from "@/components/App/Admin/Contract/Detail/DetailContent";
import JobDetail from "@/components/App/Admin/Job/Detail";
import JobDetailContent from "@/components/App/Admin/Job/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const JobDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const contractDetailQuery = useQuery({
    queryKey: ["contract-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminContractAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Công việc | SGU domitory" />
      <ContractDetail
        detail={<ContractDetailContent data={contractDetailQuery.data} />}
      />
    </>
  );
};

JobDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default JobDetailPage;
