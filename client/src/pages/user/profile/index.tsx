import authAPI from "@/api/authAPI";
import ProfileDetail from "@/components/App/Profile/Detail";
import ProfileDetailDetail from "@/components/App/Profile/Detail/detail";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const UserProfilePage: NextPageWithLayout = () => {
  const authInfor = useQuery({
    queryKey: ["info"],
    queryFn: () => authAPI.load(),
  });

  return (
    <>
      <PageHead title="Chi tiết dịch vụ | SGU dormitory" />
      <ProfileDetail detail={<ProfileDetailDetail data={authInfor.data} />} />
    </>
  );
};

UserProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default UserProfilePage;
