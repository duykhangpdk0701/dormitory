import ManagementUserProfile from "@/components/App/Users/profile";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement } from "react";

const ProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>User Details - Management</title>
      </Head>
      <ManagementUserProfile />
    </>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ProfilePage;
