import adminRoomTypeAPI from "@/api/admin/roomType";
import RoomType from "@/components/App/Admin/RoomType/List";
import RoomTypeTable from "@/components/App/Admin/RoomType/List/Table";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const RoomTypePage: NextPageWithLayout = () => {
  const roomTypeQuery = useQuery({
    queryKey: ["room-type"],
    queryFn: () => adminRoomTypeAPI.getList(),
  });

  return (
    <>
      <Head>
        <title>Danh sách Loại Phòng | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RoomType roomTypeTable={<RoomTypeTable data={roomTypeQuery.data} />} />
    </>
  );
};

RoomTypePage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default RoomTypePage;
