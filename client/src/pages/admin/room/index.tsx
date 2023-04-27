import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Head from "next/head";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import adminRoomAPI from "@/api/admin/room";
import Rooms from "@/components/App/Admin/Room/List";
import RoomTable from "@/components/App/Admin/Room/List/Table";
import PageHead from "@/components/PageHead";

const RoomPage: NextPageWithLayout = () => {
  const roomQuery = useQuery({
    queryKey: ["room"],
    queryFn: () => adminRoomAPI.getList(),
  });

  return (
    <>
      <PageHead title="Danh sách phòng | SGU domitory" />
      <Rooms roomsTable={<RoomTable data={roomQuery.data} />} />
    </>
  );
};

RoomPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default RoomPage;
