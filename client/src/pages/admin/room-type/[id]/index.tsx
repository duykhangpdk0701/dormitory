import adminRoomTypeAPI from "@/api/admin/roomType";
import RoomTypeDetail from "@/components/App/Admin/RoomType/Detail";
import RoomTypeDetailContent from "@/components/App/Admin/RoomType/Detail/DetailContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const RoomTypeDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const roomTypeDetailQuery = useQuery({
    queryKey: ["room-type", id],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return adminRoomTypeAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Chi tiết loại phòng | SGU domitory" />
      <RoomTypeDetail
        detail={
          <RoomTypeDetailContent
            data={roomTypeDetailQuery.data}
            isLoading={roomTypeDetailQuery.isLoading}
          />
        }
      />
    </>
  );
};

RoomTypeDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default RoomTypeDetailPage;
