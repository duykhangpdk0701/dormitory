import adminBillAPI from "@/api/admin/bill";
import Bill from "@/components/App/Admin/Bill/List";
import BillTable from "@/components/App/Admin/Bill/List/BillTable";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { ReactElement, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery } from "react-query";

export interface IBillParams {
  search: string;
  rowPerPage: number;
  page: number;
}

const BillPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<IBillParams>({
    defaultValues: {
      page: 0,
      rowPerPage: 5,
    },
  });

  const onSubmit: SubmitHandler<IBillParams> = (data) => {
    console.log(data);
  };

  const billListQuery = useQuery({
    queryKey: ["bill", router.isReady, router.query],
    queryFn: () => {
      if (router.isReady) {
        const searchUrl = router.query;
        const search = searchUrl.search as string | undefined;
        const limit = searchUrl.rowPerPage as number | undefined;
        const page = searchUrl.page
          ? parseInt(searchUrl.page as string)
          : undefined;
        return adminBillAPI.getAll(search, limit, page);
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
      <PageHead title="Danh sách hoá đơn ký túc xá | SGU dormitory" />
      <Bill
        table={
          <BillTable
            data={billListQuery.data}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            watch={watch}
            isLoading={billListQuery.isLoading}
          />
        }
      />
    </>
  );
};

BillPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default BillPage;
