import Messenger from "@/components/App/Messenger";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";

const MessengerPage: NextPageWithLayout = () => {
  return (
    <>
      <PageHead title="Chat | SGU dormitory" />
      {/* <Messenger /> */}
    </>
  );
};

MessengerPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default MessengerPage;
