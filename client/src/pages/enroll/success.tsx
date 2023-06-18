import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Status404 from "@/components/App/Status/Status404";
import BaseLayout from "@/layouts/BaseLayout";
import PageHead from "@/components/PageHead";
import StatusEnrollSuccess from "@/components/App/Status/EnrollSuccess/index.";

const EnrollSuccess: NextPageWithLayout = () => {
  return (
    <>
      <PageHead title="Đăng ký thành công | SGU dormitory" />
      <StatusEnrollSuccess />
    </>
  );
};

EnrollSuccess.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default EnrollSuccess;
