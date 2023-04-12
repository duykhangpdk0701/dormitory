import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import AwaitingStudentRequest from "@/components/App/Admin/AwaitingStudentRequest/list";

const AwaitingStudentRequestPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Danh sách sinh viên đợi duyệt | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AwaitingStudentRequest />
    </>
  );
};

AwaitingStudentRequestPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default AwaitingStudentRequestPage;
