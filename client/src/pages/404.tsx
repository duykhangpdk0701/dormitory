import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Status404 from "@/components/App/Status/Status404";
import BaseLayout from "@/layouts/BaseLayout";

const Custom404: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>User Settings - Applications</title>
      </Head>
      <Status404 />
    </>
  );
};

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Custom404;
