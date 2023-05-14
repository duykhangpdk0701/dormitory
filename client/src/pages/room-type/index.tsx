import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import NavLayout from "@/layouts/NavLayout";
import { useQuery } from "react-query";
import roomTypeAPI from "@/api/roomType";
import RoomTypeList from "@/components/App/RoomType/List";
import RoomTypeListList from "@/components/App/RoomType/List/List";

const RoomTypePage: NextPageWithLayout = () => {
  const roomTypeQuery = useQuery({
    queryKey: ["room-type"],
    queryFn: () => roomTypeAPI.getListOfRoom(),
  });

  return <RoomTypeList list={<RoomTypeListList data={roomTypeQuery.data} />} />;
};

RoomTypePage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default RoomTypePage;
