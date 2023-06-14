import adminJobAPI from "@/api/admin/job";
import Job from "@/components/App/Admin/Job/List";
import JobTable from "@/components/App/Admin/Job/List/JobTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import queryString from "query-string";
import adminContractAPI from "@/api/admin/contract";
import Contract from "@/components/App/Admin/Contract/List";
import ContractTable from "@/components/App/Admin/Contract/List/ContractTable";

export interface IContractParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const ContractPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IContractParams>({
    defaultValues: {
      page: 1,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IContractParams> = (data) => {
    console.log(data);
  };

  const contractListQuery = useQuery({
    queryKey: ["contract", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminContractAPI.getList(search, limit, page);
      }
      return undefined;
    },
  });

  useEffect(() => {
    watch(async (value) => {
      const stringUrl = queryString.stringify(value);
      await router.push(
        { query: queryString.parse(stringUrl) as any },
        undefined,
        {
          shallow: true,
        }
      );
    });
  }, []);

  return (
    <>
      <PageHead title="Danh sách cư dân ký túc xá | SGU domitory" />
      <Contract
        table={
          <ContractTable
            data={contractListQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={contractListQuery.isLoading}
          />
        }
      />
    </>
  );
};

ContractPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ContractPage;
