import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import NavLayout from "@/layouts/NavLayout";
import { useQuery } from "react-query";
import roomTypeAPI from "@/api/roomType";
import RoomTypeList from "@/components/App/RoomType/List";
import RoomTypeListList from "@/components/App/RoomType/List/List";
import PageTitle from "@/components/PageTitle";
import PageHead from "@/components/PageHead";

const RoomTypePage: NextPageWithLayout = () => {
  const roomTypeQuery = useQuery({
    queryKey: ["room-type"],
    queryFn: () => roomTypeAPI.getListOfRoom(),
  });

  return (
    <>
      <PageHead title="Danh sách phòng | SGU dormitory" />
      <RoomTypeList
        list={
          <RoomTypeListList
            data={roomTypeQuery.data}
            isLoading={roomTypeQuery.isLoading}
          />
        }
      />
    </>
  );
};

RoomTypePage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default RoomTypePage;
