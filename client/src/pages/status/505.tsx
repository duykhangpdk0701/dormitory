import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Status500 from "@/components/App/Status/Status500";
import BaseLayout from "@/layouts/BaseLayout";

const Custom505: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>User Settings - Applications</title>
      </Head>
      <Status500 />
    </>
  );
};

Custom505.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Custom505;
