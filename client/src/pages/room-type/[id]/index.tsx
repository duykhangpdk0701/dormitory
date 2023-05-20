import roomTypeAPI from "@/api/roomType";
import RoomTypeDetail from "@/components/App/RoomType/Detail";
import RoomTypeDetailContent from "@/components/App/RoomType/Detail/DetailContent";
import RoomTypeDetailContentLoading from "@/components/App/RoomType/Detail/DetailContentLoading";
import PageHead from "@/components/PageHead";
import IRoomType from "@/interfaces/RoomTypet";
import NavLayout from "@/layouts/NavLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const RoomTypeDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const roomTypeQuery = useQuery({
    queryKey: ["room-type"],
    queryFn: () => {
      if (id && typeof id !== "object") {
        return roomTypeAPI.getById(id);
      }
      return undefined;
    },
  });

  return (
    <>
      <PageHead title="Chi tiết phòng | SGU dormitory" />
      <RoomTypeDetail
        detail={
          roomTypeQuery.isLoading ? (
            <RoomTypeDetailContentLoading />
          ) : (
            <RoomTypeDetailContent data={roomTypeQuery.data} />
          )
        }
      />
    </>
  );
};

RoomTypeDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default RoomTypeDetailPage;
