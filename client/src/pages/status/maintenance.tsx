import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Maintenance from "@/components/App/Status/Maintenance";
import BaseLayout from "@/layouts/BaseLayout";

const MaintenancePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Maintenance - Applications</title>
      </Head>
      <Maintenance />
    </>
  );
};

MaintenancePage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default MaintenancePage;
