import EditRoom from "@/components/App/Admin/Room/Edit";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement } from "react";

const EditRoomPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>chi tiết | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditRoom />
    </>
  );
};

EditRoomPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default EditRoomPage;
