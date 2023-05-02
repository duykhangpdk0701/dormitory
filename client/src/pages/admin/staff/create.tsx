import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";

const StaffCreatePage: NextPageWithLayout = () => {
  return <div>StaffCreatePage</div>;
};

StaffCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default StaffCreatePage;
