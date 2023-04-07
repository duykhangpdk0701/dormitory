import Transaction from "@/components/App/Transactions";
import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import SidebarLayout from "@/layouts/SidebarLayout";

const TransactionPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Transactions - Applications</title>
      </Head>
      <Transaction />
    </>
  );
};

TransactionPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default TransactionPage;
