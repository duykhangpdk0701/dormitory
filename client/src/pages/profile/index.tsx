import ProfileDetail from "@/components/App/Profile/Detail";
import PageHead from "@/components/PageHead";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import { useQuery } from "react-query";
import authAPI from "@/api/authAPI";
import ProfileDetailDetail from "@/components/App/Profile/Detail/detail";

const ProfilePage: NextPageWithLayout = () => {
  const authInfor = useQuery({
    queryKey: ["info"],
    queryFn: () => authAPI.load(),
  });

  return (
    <>
      <PageHead title="Trang cá nhân | SGU dormitory" />
      <ProfileDetail detail={<ProfileDetailDetail data={authInfor.data} />} />
    </>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default ProfilePage;
