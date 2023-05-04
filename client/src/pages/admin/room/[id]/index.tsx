import adminRoomAPI from "@/api/admin/room";
import EditRoom from "@/components/App/Admin/Room/Edit";
import RoomDetail from "@/components/App/Admin/Room/detail";
import RoomDetailContent from "@/components/App/Admin/Room/detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const RoomDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const roomDetailQuery = useQuery({
    queryKey: ["civilian-detail", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminRoomAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Phòng | SGU domitory" />
      <RoomDetail detail={<RoomDetailContent data={roomDetailQuery.data} />} />
    </>
  );
};

RoomDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default RoomDetailPage;
