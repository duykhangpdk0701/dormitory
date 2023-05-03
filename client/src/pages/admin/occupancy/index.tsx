import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";

const OccupancyPage: NextPageWithLayout = () => {
  return <div>index</div>;
};

OccupancyPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default OccupancyPage;
