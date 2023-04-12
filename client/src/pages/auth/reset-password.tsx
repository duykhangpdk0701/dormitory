import ResetPassword from "@/components/App/Auth/reset";
import Head from "next/head";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Thay đổi mật khẩu | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
