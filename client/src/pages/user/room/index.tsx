import React, { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageHead from "@/components/PageHead";
import { useQuery } from "react-query";
import authAPI from "@/api/authAPI";
import RoomView from "@/components/App/User/Room";
import RoomViewContent from "@/components/App/User/Room/DetailContent";
import adminRoomAPI from "@/api/admin/room";

const ComplaintListPage: NextPageWithLayout = () => {
  const loadUserinfo = useQuery({
    queryKey: ["user-info"],
    queryFn: authAPI.load,
  });

  const roomDetail = useQuery({
    queryKey: ["room-detail", loadUserinfo],
    queryFn: () => {
      if (loadUserinfo.data)
        return adminRoomAPI.getById(loadUserinfo.data.user.infor.roomId);
      return undefined;
    },
    enabled: loadUserinfo.isFetched,
  });

  return (
    <>
      <PageHead title="Phòng | SGU domitory" />
      <RoomView detail={<RoomViewContent data={roomDetail.data} />} />
    </>
  );
};

ComplaintListPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout menuType="user">{page}</SidebarLayout>;
};

export default ComplaintListPage;
