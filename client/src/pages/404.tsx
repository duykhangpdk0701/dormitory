import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Status404 from "@/components/App/Status/Status404";
import BaseLayout from "@/layouts/BaseLayout";
import PageHead from "@/components/PageHead";

const Custom404: NextPageWithLayout = () => {
  return (
    <>
      <PageHead title="Không tìm thấy trang | SGU dormitory" />
      <Status404 />
    </>
  );
};

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Custom404;
