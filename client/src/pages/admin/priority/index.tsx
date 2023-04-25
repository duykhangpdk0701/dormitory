import adminPriority from "@/api/admin/priority";
import Priority from "@/components/App/Admin/Priority/List";
import PriorityTable from "@/components/App/Admin/Priority/List/PriorityTable";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const PriorityPage: NextPageWithLayout = () => {
  const priority = useQuery({
    queryKey: ["priority"],
    queryFn: () => adminPriority.getList(),
  });

  return (
    <>
      <Head>
        <title>Danh sách quyền | SGU domitory</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />{" "}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Priority table={<PriorityTable data={priority.data} />} />
    </>
  );
};

PriorityPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default PriorityPage;
