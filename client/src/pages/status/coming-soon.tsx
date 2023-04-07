import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ComingSoon from "@/components/App/Status/ComingSoon";
import BaseLayout from "@/layouts/BaseLayout";

const ComingSoonPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>User Settings - Applications</title>
      </Head>
      <ComingSoon />
    </>
  );
};

ComingSoonPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default ComingSoonPage;
