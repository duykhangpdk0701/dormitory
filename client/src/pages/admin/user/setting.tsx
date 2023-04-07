import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import ManagementUserSettings from "@/components/App/Users/settings";

const SettingPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>User Settings - Applications</title>
      </Head>
      <ManagementUserSettings />
    </>
  );
};

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default SettingPage;
