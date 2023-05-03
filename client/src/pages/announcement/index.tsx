import PageHead from "@/components/PageHead";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import NavLayout from "@/layouts/NavLayout";
import Announcement from "@/components/App/Announcement";

const AnnouncementPage: NextPageWithLayout = () => {
  return (
    <>
      <PageHead title="Thông báo | ký túc xá đại học sài gòn" />
      <Announcement />
    </>
  );
};

AnnouncementPage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default AnnouncementPage;
