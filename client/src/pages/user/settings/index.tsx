import ManagementUserSettings from "@/components/App/User/Settings";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";

const UserSetting: NextPageWithLayout = () => {
  return (
    <>
      <ManagementUserSettings />
    </>
  );
};

UserSetting.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default UserSetting;
