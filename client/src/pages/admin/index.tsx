import Head from "next/head";
import Dashboard from "@/components/App/Dashboard";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import SidebarLayout from "@/layouts/SidebarLayout";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>
      <Dashboard />
    </>
  );
};


DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default DashboardPage;
