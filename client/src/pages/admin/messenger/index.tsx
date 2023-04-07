import Messenger from "@/components/App/Messenger";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement } from "react";

const MessengerPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Messenger - Applications</title>
      </Head>
      <Messenger />
    </>
  );
};

MessengerPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default MessengerPage;
