import Head from "next/head";
import Dashboard from "@/components/App/Dashboard";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <PageHead title="Dashboard | SGU domiotry" />
      <Dashboard />
    </>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default DashboardPage;
