import React, { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import { Container } from "@mui/material";

interface IRoomTypeList {
  list: ReactNode;
}

const RoomTypeList: FC<IRoomTypeList> = (props) => {
  const { list } = props;
  return (
    <>
      <PageTitleWrapper>
        <PageHeader
          title="Phòng"
          desc="Dưới đây là danh sách trong hệ thống"
          isHaveNavigateButton={false}
        />
      </PageTitleWrapper>
      <Container className="min-h-[100vh] mb-10">{list}</Container>
    </>
  );
};

export default RoomTypeList;
