import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";

const MessageDetail: NextPageWithLayout = () => {
  return <div>MessageDetail</div>;
};

MessageDetail.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default MessageDetail;
