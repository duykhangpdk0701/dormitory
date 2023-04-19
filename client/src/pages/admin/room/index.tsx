import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import adminRoomAPI from "@/api/admin/room";
import Rooms from "@/components/App/Admin/Room/List";
import RoomTable from "@/components/App/Admin/Room/List/Table";

const RoomPage: NextPageWithLayout = () => {
  const roomQuery = useQuery({
    queryKey: ["room"],
    queryFn: () => adminRoomAPI.getList(),
  });

  return (
    <>
      <Head>
        <title>Danh sách Phòng | SGU domitory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Rooms roomsTable={<RoomTable data={roomQuery.data} />} />
    </>
  );
};

RoomPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default RoomPage;
