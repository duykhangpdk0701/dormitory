import ResetPassword from "@/components/App/Auth/reset";
import PageHead from "@/components/PageHead";
import Head from "next/head";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <>
      <PageHead title="Thay đổi mật khẩu | SGU domitory" />
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
