import ManagementUserProfile from "@/components/App/User/Profile";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";

const UserProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <PageHead title="Thông tin cá nhân | SGU dormitory" />
      <ManagementUserProfile detail={<></>} />
    </>
  );
};

UserProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default UserProfilePage;
